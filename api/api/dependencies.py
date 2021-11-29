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
