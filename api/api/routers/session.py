from bcrypt import checkpw
from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from jose.exceptions import JWTError
from pydantic import BaseModel
from sqlmodel import Session, select

from ..config import engine
from ..models import ReadUser, User
from ..utils import jsonwebtoken

router = APIRouter(prefix='/sessions', tags=['sessions'])


class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: ReadUser


@router.post(
    path='/',
    status_code=201,
    response_model=LoginResponse,
    response_model_exclude_none=True
)
async def login(credential: OAuth2PasswordRequestForm = Depends()):
    username: str = credential.username
    password: str = credential.password

    with Session(engine) as session:
        stmt = select(User).where(User.email == username)
        user = session.exec(stmt).one_or_none()

        if user is None or checkpw(password.encode('utf-8'), user.password):
            raise HTTPException(400, 'Invalid username or password')

        return dict(
            access_token=jsonwebtoken.sign(dict(sub=user.id)),
            token_type='bearer',
            data=user
        )


@router.delete('/{token}', status_code=204)
async def logout(token: str):
    try:
        jsonwebtoken.invalidate(token)
    except JWTError as error:
        raise HTTPException(400, 'Invalid token') from error
