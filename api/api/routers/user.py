from datetime import datetime, timezone
from typing import Optional

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path
from fastapi.responses import Response
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session, select

from ..dependencies import get_current_user, get_session
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


@router.get(
    path='/',
    response_model=Paginated[ReadUser],
    response_model_exclude_none=True,
)
async def readall(*, query: Query = Depends(), session: Session = Depends(get_session)):
    offset = (query.page - 1) * query.page_size

    stmt = select(User)

    if query.search:
        pass

    total = session.query(stmt).count()

    hasnext = total - (query.page * query.page_size) > 0

    rows = session.exec(stmt.offset(offset).limit(query.page_size)).all()

    return Response(
        content=dict(
            page=1,
            page_size=25,
            rows=rows,
            total_rows=total,
            has_next=hasnext,
        ),
        status_code=status.HTTP_206_PARTIAL_CONTENT if hasnext else status.HTTP_200_OK
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
    if user.id == id_:
        return user

    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)


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


@router.delete(path='/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete(*, user: User = Depends(verify_owner), session: Session = Depends(get_session)):
    session.delete(user)
    session.commit()
