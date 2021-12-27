from bcrypt import checkpw
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from jose.exceptions import ExpiredSignatureError, JWTError
from pydantic import BaseModel
from sqlmodel import Session, select

from ..dependency import get_session
from ..models import ReadUser, User
from ..utils import jsonwebtoken

router = APIRouter(prefix='/sessions', tags=['session'])


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    data: ReadUser


@router.post(path='/', status_code=status.HTTP_201_CREATED)
async def login(
    *,
    credential: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    username: str = credential.username
    password: bytes = credential.password.encode('utf-8')

    stmt = select(User).where(User.email == username).limit(1)
    user = session.exec(stmt).one_or_none()

    if user is None or not checkpw(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Invalid credentials.'
        )

    token = jsonwebtoken.sign(dict(user_id=user.id))

    return LoginResponse(
        access_token=token,
        token_type='bearer',
        data=user
    )


@router.delete(path='/{token}', status_code=status.HTTP_204_NO_CONTENT)
async def logout(*, token: str):
    try:
        jsonwebtoken.invalidate(token)
    except ExpiredSignatureError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Expired token.'
        ) from error
    except JWTError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Invalid token.'
        ) from error

# TODO: add refresh token route
