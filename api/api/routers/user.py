from datetime import datetime, timezone

import bcrypt
from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Body, Path
from sqlmodel import Session, select

from ..config import engine
from ..models import CreateUser, Paginated, ReadUser, UpdateUser, User

router = APIRouter(prefix='/users', tags=['users'])


@router.post(
    path='/',
    status_code=201,
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def create_account(data: CreateUser):
    password = bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt())

    user = User(
        name=data.name,
        email=data.email,
        password=password,
        created_at=datetime.now(timezone.utc)
    )

    with Session(engine) as session:
        session.add(user)
        session.commit()
        session.refresh(user)

        return user


@router.get(
    path='/{id}',
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def profile(id_: int = Path(..., alias='id')):
    with Session(engine) as session:
        stmt = select(User).where(User.id == id_)
        user = session.exec(stmt).one_or_none()

        if user is None:
            raise HTTPException(404)

        return user


@router.get(
    path='/',
    response_model=Paginated[ReadUser],
    response_model_exclude_none=True
)
async def get_users():
    pass


@router.patch(
    path='/{id}',
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def update(id_: int = Path(..., alias='id'), data: UpdateUser = Body(...)):
    with Session(engine) as session:
        stmt = select(User).where(User.id == id_)
        user = session.exec(stmt).one_or_none()

        if user is None:
            raise HTTPException(404)

        for k, v in data.dict(exclude_none=True).items():
            if hasattr(user, k):
                setattr(user, k, v)

        user.updated_at = datetime.now(timezone.utc)

        session.add(user)
        session.commit()
        session.refresh(user)

        return user


@router.delete('/{id}', status_code=204)
async def delete_account(id_: int = Path(..., alias='id')):
    with Session(engine) as session:
        stmt = select(User).where(User.id == id_)
        user = session.exec(stmt).one_or_none()

        if user is None:
            raise HTTPException(404)

        session.delete(user)
        session.commit()
