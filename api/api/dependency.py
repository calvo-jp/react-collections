from typing import Optional

from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Query
from fastapi.requests import Request
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose.exceptions import ExpiredSignatureError, JWTError
from sqlalchemy.exc import NoResultFound
from sqlmodel import Session

from .config import engine
from .models import User
from .utils import jsonwebtoken


async def get_session():
    with Session(engine) as session:
        yield session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/sessions')


async def get_current_user(
    *,
    token: str = Depends(oauth2_scheme),
    request: Request,
    session: Session = Depends(get_session)
):
    try:
        claims = jsonwebtoken.decode(token)
        user = session.get(User, claims['user_id'])

        if not user:
            raise NoResultFound()

        request.state.current_user = user
        return user
    except ExpiredSignatureError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Expired token.'
        ) from error
    except (IndexError, JWTError, NoResultFound) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token.'
        ) from error


class SearchParams:
    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(default=None, ge=1, le=100),
        search: Optional[str] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search

    @property
    def limit(self):
        return self.page_size

    @property
    def offset(self):
        return (self.page - 1) * self.limit
