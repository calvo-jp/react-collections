from datetime import datetime, timezone

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session

from ..dependency import get_current_user, get_session
from ..models import CreateUser, ReadUser, UpdateUser, User

router = APIRouter(prefix='/users', tags=['user'])


@router.get(path='/{id}', response_model=ReadUser, response_model_exclude_none=True)
async def read_one(
    *,
    id_: int = Path(..., alias='id'),
    session: Session = Depends(get_session)
):
    user = session.get(User, id_)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return user


@router.post(
    path='/',
    status_code=status.HTTP_201_CREATED,
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def create(*, data: CreateUser, session: Session = Depends(get_session)):
    try:
        user = User(
            name=data.name,
            email=data.email,
            password=hashpw(data.password.encode('utf-8'), gensalt()),
            created_at=datetime.now(timezone.utc)
        )

        session.add(user)
        session.commit()
        session.refresh(user)

        return user
    except IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Email already exists'
        ) from error


async def verify_owner(
    *,
    id_: int = Path(..., alias='id'),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    user = session.get(User, id_)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if user.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    return user


@router.patch(path='/{id}', response_model=ReadUser, response_model_exclude_none=True)
async def update(
    *,
    user: User = Depends(verify_owner),
    data: UpdateUser,
    session: Session = Depends(get_session)
):
    for k, v in data.dict(exclude_none=True).items():
        setattr(user, k, v)

    if data.email is not None and data.email != user.email:
        user.email_verified = False

    user.updated_at = datetime.now(timezone.utc)

    session.add(user)
    session.commit()
    session.refresh(user)

    return user
