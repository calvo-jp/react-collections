from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.requests import Request
from fastapi.security.oauth2 import OAuth2PasswordBearer
from jose.exceptions import ExpiredSignatureError, JWTError
from sqlmodel import Session

from .config import engine
from .models import User
from .utils import jsonwebtoken

_oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/sessions')


async def get_session():
    with Session(engine) as session:
        yield session


async def get_current_user(
    *,
    token: str = Depends(_oauth2_scheme),
    request: Request,
    session: Session = Depends(get_session)
):
    try:
        claims = jsonwebtoken.decode(token)
        user = session.get(User, claims['user_id'])
        assert user is not None
        request.state.current_user = user
        return request.state.current_user
    except ExpiredSignatureError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Expired token.'
        ) from error
    except (JWTError, AssertionError) as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid token.'
        ) from error
