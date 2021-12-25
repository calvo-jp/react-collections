from datetime import datetime, timezone

from bcrypt import gensalt, hashpw
from fastapi import (APIRouter, Depends, File, HTTPException, Path, Response,
                     UploadFile, status)
from sqlmodel import Session, select

from ..dependencies import get_session
from ..models import CreateUser, ReadUser, UpdateUser, User
from ..utils import file_uploader

router = APIRouter(prefix="/user", tags=["users"])


@router.get(path="/", response_model=list[ReadUser])
async def findall(*, session: Session = Depends(get_session)):
    return session.exec(select(User)).all()


@router.get(path="/{id}", response_model=ReadUser)
async def findone(
    *,
    id_: int = Path(..., alias="id"),
    session: Session = Depends(get_session)
):
    user = session.get(User, id_)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return user


@router.post(path="/", response_model=ReadUser, status_code=status.HTTP_201_CREATED)
async def create(*, data: CreateUser, session: Session = Depends(get_session)):
    user = User(
        name=data.name,
        email=data.email,
        password=hashpw(data.password.encode("utf-8"), gensalt()),
        created_at=datetime.now(timezone.utc)
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


async def findone_strict(
    *,
    id_: int = Path(..., alias='id'),
    session: Session = Depends(get_session)
):
    """verify user in path matches user in token"""


@router.patch(path="/{id}", response_model=ReadUser)
async def update(
    *,
    data: UpdateUser,
    user: User = Depends(findone_strict),
    session: Session = Depends(get_session)
):
    for k, v in data.dict(exclude_none=True).items():
        setattr(user, k, v)

    user.updated_at = datetime.now(timezone.utc)

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.put(
    path="/{id}/avatar",
    response_model_exclude_none=True,
    response_model=User
)
async def set_avatar(
    *,
    user: User = Depends(findone_strict),
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    response: Response
):
    response.status_code = status.HTTP_201_CREATED

    if isinstance(user.avatar, str):
        file_uploader.remove(user.avatar)

        response.status_code = status.HTTP_200_OK

    fileinfo = file_uploader.upload(file, whitelist=[
        "image/jpeg",
        "image/jpg",
        "image/png"
    ])

    user.avatar = fileinfo["filename"]
    user.updated_at = datetime.now(timezone.utc)

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.delete(path="/{id}/avatar", status_code=status.HTTP_204_NO_CONTENT)
async def unset_avatar(
    *,
    user: User = Depends(findone_strict),
    session: Session = Depends(get_session)
):
    if isinstance(user.avatar, str):
        file_uploader.remove(user.avatar)

        user.avatar = None
        user.updated_at = datetime.now(timezone.utc)

        session.add(user)
        session.commit()
        session.refresh(user)
