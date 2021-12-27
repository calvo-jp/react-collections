from typing import Optional

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, status
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, File, Path, Query
from fastapi.responses import Response
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, func, select

from ..dependency import SearchParams, get_current_user, get_session
from ..models import CreateUser, Paginated, ReadUser, UpdateUser, User
from ..utils import file_uploader

router = APIRouter(prefix='/users', tags=['user'])


class UserSearchParams(SearchParams):
    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(default=None, ge=1, le=100),
        search: Optional[str] = None
    ):
        super().__init__(page=page, page_size=page_size, search=search)


@router.get(path='/', response_model=Paginated[ReadUser], response_model_exclude_none=True)
async def findall(
    *,
    params: UserSearchParams = Depends(),
    session: Session = Depends(get_session),
    response: Response
):
    stmt = select(User)

    # TODO: implement fulltext search
    if params.search is None:
        pass

    totalrows: int = session.execute(
        stmt.with_only_columns(func.count(User.id))
    ).scalar_one()

    hasnext = totalrows > params.page * params.limit

    rows = session.exec(
        stmt
        .limit(params.limit)
        .offset(params.offset)
    ).all()

    response.status_code = status.HTTP_200_OK

    if hasnext:
        response.status_code = status.HTTP_206_PARTIAL_CONTENT

    return dict(
        rows=rows,
        total_rows=totalrows,
        has_next=hasnext,
        page=params.page,
        page_size=params.limit,
        search=params.search
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
            password=hashpw(data.password.encode('utf-8'), gensalt())
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
async def findone(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
    user = session.get(User, id_)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return user


async def findone_strict(
    *,
    id_: int = Path(..., alias='id'),
    user: User = Depends(get_current_user)
):
    if user.id != id_:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return user


@router.patch(path='/{id}', response_model=ReadUser, response_model_exclude_none=True)
async def update(
    *,
    user: User = Depends(findone_strict),
    data: UpdateUser,
    session: Session = Depends(get_session)
):
    if data.email == user.email:
        data.email = None

    try:
        for k, v in data.dict(exclude_none=True).items():
            setattr(user, k, v)

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
async def set_avatar(
    *,
    image: UploadFile = File(...),
    user: User = Depends(findone_strict),
    session: Session = Depends(get_session),
    response: Response
):
    status_code = status.HTTP_201_CREATED

    if user.avatar is not None:
        file_uploader.delete(user.avatar)
        status_code = status.HTTP_200_OK

    valid_types = [
        'image/jpeg',
        'image/jpg',
        'image/png',
    ]

    try:
        user.avatar = file_uploader.upload(image, whitelist=valid_types)

        session.add(user)
        session.commit()
        session.refresh(user)

        response.status_code = status_code

        return user
    except file_uploader.UnsupportedFileType as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Unsupported file type'
        ) from error


@router.delete(path='/{id}/avatar', status_code=status.HTTP_204_NO_CONTENT)
async def unset_avatar(
    *,
    user: User = Depends(findone_strict),
    session: Session = Depends(get_session)
):
    if user.avatar is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    file_uploader.delete(user.avatar)

    user.avatar = None

    session.add(user)
    session.commit()
