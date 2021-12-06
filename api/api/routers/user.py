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

from ..dependencies import get_current_user, get_session
from ..models import CreateUser, Paginated, ReadUser, UpdateUser, User
from ..utils import file_uploader

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


@router.get(
    path='/',
    response_model=Paginated[ReadUser],
    response_model_exclude_none=True,
)
async def read_all(
    *,
    query: Query = Depends(),
    session: Session = Depends(get_session),
    response: Response
):
    stmt = select(User)

    # TODO: implement fulltext search
    if query.search:
        pass

    totalrows: int = session.execute(
        stmt.with_only_columns(func.count(User.id))
    ).scalar_one()
    hasnext = totalrows - (query.page * query.page_size) > 0
    rows = session.exec(
        stmt.limit(query.page_size).offset((query.page - 1) * query.page_size)
    ).all()

    response.status_code = status.HTTP_206_PARTIAL_CONTENT if hasnext else status.HTTP_200_OK
    return dict(
        page=1,
        page_size=25,
        rows=rows,
        total_rows=totalrows,
        has_next=hasnext,
    )


@router.get(
    path='/{id}',
    response_model=ReadUser,
    response_model_exclude_none=True,
)
async def readone(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
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
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Email already exists'
        ) from error


def verify_owner(*, id_: int = Path(..., alias='id', ge=1), user: User = Depends(get_current_user)):
    if user.id != id_:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return user


@router.patch(
    path='/{id}',
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def update(
    *,
    data: UpdateUser,
    user: User = Depends(verify_owner),
    session: Session = Depends(get_session)
):
    try:
        if data.email is not None and data.email != user.email:
            user.email_verified = False

        for k, v in data.dict(exclude_none=True).items():
            if hasattr(user, k):
                setattr(user, k, v)

            user.updated_at = datetime.now(timezone.utc)

        session.add(user)
        session.commit()
        session.refresh(user)

        return user
    except IntegrityError as error:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Email already exists'
        ) from error


@router.put(path='/{id}/avatar', response_model=ReadUser, response_model_exclude_none=True)
async def setup_avatar(
    *,
    avatar: UploadFile = File(...),
    user: User = Depends(verify_owner),
    session: Session = Depends(get_session),
    response: Response
):
    response.status_code = status.HTTP_201_CREATED

    if user.avatar is not None:
        file_uploader.delete(user.avatar)

        response.status_code = status.HTTP_200_OK

    user.avatar = file_uploader.upload(avatar)
    user.updated_at = datetime.now(timezone.utc)

    session.add(user)
    session.commit()
    session.refresh(user)

    return user


@router.delete(path='/{id}/avatar', status_code=status.HTTP_204_NO_CONTENT)
async def delete_avatar(
    *,
    user: User = Depends(verify_owner),
    session: Session = Depends(get_session),
):
    if user.avatar is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    file_uploader.delete(user.avatar)

    user.avatar = None
    user.updated_at = datetime.now(timezone.utc)

    session.add(user)
    session.commit()
