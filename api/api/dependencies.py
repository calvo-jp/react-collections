from typing import Callable, Optional

from fastapi import Request
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose import ExpiredSignatureError, JWTError
from pydantic.fields import Field
from sqlalchemy.exc import NoResultFound
from sqlmodel import Session, select

from .config import engine
from .models import User
from .utils import jsonwebtoken

oauth2_scheme = OAuth2PasswordBearer('/sessions')


async def get_current_user(request: Request, token: str = Depends(oauth2_scheme)):
    with Session(engine) as session:
        try:
            payload = jsonwebtoken.decode(token)

            stmt = select(User).where(User.id == payload['sub'])
            user = session.exec(stmt).one()

            request.state.current_user = user

            return user
        except ExpiredSignatureError as error:
            raise HTTPException(401, 'Expired token') from error
        except (JWTError, NoResultFound, IndexError) as error:
            raise HTTPException(401, 'Invalid token') from error


def verify_owner(path_userid_alias: Optional[str] = None):
    """
    A decorator that raises a `403` error if user id in path
    does not match the user id found in token.
    By default the param name is `id`, but you can also pass a custom name or alias.
    Note that this should not be used like a regular dependecy.
    See example usage below.

    ```
    @verify_owner()
    @router.post(path='/{id}', ...)

    @verify_owner('alias')
    @router.patch(path='/{alias}', ...)

    # DON'T DO THIS
    @verify_owner
    @router.delete(path='/{id}', ...)
    ```
    """

    if path_userid_alias is None:
        path_userid_alias = 'id'

    def verify_owner_(
        path_userid: int = Path(..., alias=path_userid_alias),
        user: User = Depends(get_current_user)
    ):
        if user.id != path_userid:
            raise HTTPException(403, 'Error making changes to other account')

    def wrapper(func: Callable):
        def inner(*args, **kwargs):
            dependencies: list = kwargs.get('dependencies') or []
            dependencies.append(Depends(verify_owner_))
            kwargs['dependencies'] = dependencies
            return func(*args, **kwargs)
        return inner
    return wrapper


class UserSearchQuery:
    def __init__(
        self,
        page: Optional[int] = Field(default=None, ge=1),
        page_size: Optional[int] = Field(default=None, ge=1, le=100),
        search: Optional[str] = Field(default=None, min_length=1),
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search


class PlaceSearchQuery:
    def __init__(
        self,
        page: Optional[int] = Field(default=None, ge=1),
        page_size: Optional[int] = Field(default=None, ge=1, le=100),
        search: Optional[str] = Field(default=None, min_length=1),
        author_id: Optional[int] = None,
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search
        self.author_id = author_id
