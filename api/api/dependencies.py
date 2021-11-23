from fastapi import Request
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose import ExpiredSignatureError, JWTError
from sqlmodel import Session, select

from .config import engine
from .models import User
from .utils import jsonwebtoken

_oauth2_scheme = OAuth2PasswordBearer('/sessions')


async def get_current_user(request: Request, token: str = Depends(_oauth2_scheme)):
    """Gets user from token and adds it to app current state"""

    try:
        claims = jsonwebtoken.decode(token)
        user_id = claims.get('sub')

        if user_id is None:
            raise JWTError()

        with Session(engine) as session:
            stmt = select(User).where(User.id == user_id)
            user = session.exec(stmt).one_or_none()

            if not user:
                raise JWTError()

            request.state.current_user = user
            return user
    except ExpiredSignatureError as error:
        raise HTTPException(401, 'Expired token') from error
    except JWTError as error:
        raise HTTPException(401, 'Invalid token') from error
