from fastapi import Request
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
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
            raise HTTPException(404, 'Invalid token') from error
