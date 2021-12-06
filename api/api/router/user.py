# pylint: disable=consider-using-f-string

import os
import shutil
import uuid
from datetime import datetime, timezone
from typing import Optional

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, status
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, File, Path
from fastapi.responses import Response
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, func, select

from ..config import config
from ..dependency import get_current_user, get_session
from ..models import CreateUser, Paginated, ReadUser, UpdateUser, User

router = APIRouter(prefix='/users', tags=['user'])


class Query:
    def __init__(
        self,
        *,
        page: Optional[int] = None,
        page_size: Optional[int] = None,
        search: Optional[str] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search


@router.get(path='/', response_model=Paginated[ReadUser], response_model_exclude_none=True)
async def read_all(*, query: Query = Depends(), session: Session = Depends(get_session)):
    stmt = select(User)

    # TODO: implement fulltext search
    if query.search:
        pass

    total_rows: int = session.execute(
        stmt.with_only_columns(func.count(User.id))
    ).scalar_one()

    rows = session.exec(
        stmt.limit(query.page_size).offset((query.page - 1) * query.page_size)
    ).all()

    has_next = total_rows > query.page * query.page_size

    return Response(
        status_code=status.HTTP_206_PARTIAL_CONTENT if has_next else status.HTTP_200_OK,
        content=dict(
            page=query.page,
            page_size=query.page_size,
            total_rows=total_rows,
            rows=rows,
            has_next=has_next
        ),
    )


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


@router.get(path='/{id}', response_model=ReadUser, response_model_exclude_none=True)
async def read_one(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
    user = session.get(User, id_)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return user


async def verify_owner(*, id_: int = Path(..., alias='id'), user: User = Depends(get_current_user)):
    if user.id != id_:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return user


@router.patch(path='/{id}', response_model=ReadUser, response_model_exclude_none=True)
async def update(
    *,
    user: User = Depends(verify_owner),
    data: UpdateUser,
    session: Session = Depends(get_session)
):
    if data.email == user.email:
        data.email = None

    try:
        for k, v in data.dict(exclude_none=True).items():
            setattr(user, k, v)

            user.updated_at = datetime.now(timezone.utc)

        session.add(user)
        session.commit()
        session.refresh(user)

        return user
    except IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Email already exists'
        ) from error


@router.put(path='/{id}/avatar', response_model=ReadUser, response_model_exclude_none=True)
async def setup_avatar(
    *,
    image: UploadFile = File(...),
    user: User = Depends(verify_owner),
    session: Session = Depends(get_session)
):
    valid_types = [
        'image/jpeg',
        'image/jpe',
        'image/jpg',
        'image/png',
    ]

    if not image.content_type in valid_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Unsupported file type'
        )

    status_code = status.HTTP_201_CREATED

    if user.avatar is not None:
        fullpath = os.path.join(config.uploads_dir, user.avatar)
        if os.path.exists(fullpath):
            os.unlink(fullpath)

        # update should return 200 OK status
        status_code = status.HTTP_200_OK

    # TODO: ensure unique filename
    filetype: str = image.content_type
    extension = filetype.removeprefix("image/")
    filename = '%s.%s' % (uuid.uuid4().hex, extension)
    fullpath = os.path.join(config.uploads_dir, filename)

    with open(fullpath, 'wb') as buffer:
        shutil.copyfileobj(image.file, buffer)

        user.avatar = filename
        user.updated_at = datetime.now(timezone.utc)

        session.add(user)
        session.commit()
        session.refresh(user)

        return Response(status_code=status_code, content=user)


@router.delete(path='/{id}/avatar', status_code=status.HTTP_204_NO_CONTENT)
async def delete_avatar(
    *,
    user: User = Depends(verify_owner),
    session: Session = Depends(get_session)
):
    if user.avatar is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    fullpath = os.path.join(config.uploads_dir, user.avatar)

    if os.path.exists(fullpath):
        os.unlink(fullpath)

    user.avatar = None
    user.updated_at = datetime.now(timezone.utc)

    session.add(user)
    session.commit()
