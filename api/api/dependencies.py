from typing import Callable, Optional

from fastapi import Request
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose import ExpiredSignatureError, JWTError
from sqlalchemy.exc import NoResultFound
from sqlmodel import Session, select

from .config import engine
from .models import User
from .utils import jsonwebtoken

oauth2_scheme = OAuth2PasswordBearer('/sessions')


async def get_current_user_id(request: Request, token: str = Depends(oauth2_scheme)) -> int:
    try:
        claims = jsonwebtoken.decode(token)
        request.state.current_user_id = claims['sub']
        return request.state.current_user_id
    except ExpiredSignatureError as error:
        raise HTTPException(401, 'Expired token') from error
    except JWTError as error:
        raise HTTPException(401, 'Invalid token') from error


async def get_current_user(request: Request, user_id: int = Depends(get_current_user_id)):
    with Session(engine) as session:
        try:
            user = session.exec(select(User).where(User.id == user_id)).one()
            request.state.current_user = user
            return user
        except NoResultFound as error:
            raise HTTPException(401, 'Invalid token') from error


def verify_owner(path_userid_alias: Optional[str] = None):
    """
    A decorator that raises a `403` error if user id in path
    does not match the user id found in token.
    Be default the param name is `id`, but you can also pass a custom name or alias.
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
        token_userid: int = Depends(get_current_user_id)
    ):
        if token_userid != path_userid:
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
        page: Optional[int] = None,
        page_size: Optional[int] = None,
        search: Optional[str] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search
