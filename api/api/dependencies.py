from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.requests import Request
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose.exceptions import ExpiredSignatureError, JWTError
from sqlalchemy.exc import NoResultFound
from sqlmodel import Session, select

from .config import engine
from .models import User
from .utils import jsonwebtoken

_oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/sessions')


async def get_current_user(request: Request, token: str = Depends(_oauth2_scheme)):
    try:
        claims = jsonwebtoken.decode(token)

        with Session(engine) as session:
            stmt = select(User).where(User.id == claims['sub'])
            user = session.exec(stmt).one()

            request.state.current_user = user

            return user
    except ExpiredSignatureError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Expired token.'
        ) from error
    except (JWTError, NoResultFound) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token.'
        ) from error


async def get_session():
    with Session(engine) as session:
        yield session
