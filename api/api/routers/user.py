from datetime import datetime, timezone
from typing import Any, Callable, Optional

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Body, Depends, Path
from fastapi.responses import Response
from sqlmodel import Session, select

from ..config import engine
from ..dependencies import get_current_user
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
    dependencies=[Depends(get_current_user)],
)
async def readall(query: Query = Depends()):
    with Session(engine) as session:
        offset = (query.page - 1) * query.page_size

        stmt = select(User)

        if query.search:
            pass

        total = session.query(stmt).count()

        hasnext = total - (query.page * query.page_size) > 0

        rows = session.exec(stmt.offset(offset).limit(query.page_size))

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
    dependencies=[Depends(get_current_user)],
)
async def readone(id_: int = Path(..., alias='id')):
    with Session(engine) as session:
        stmt = select(User).where(User.id == id_)
        user = session.exec(stmt).one_or_none()

        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

        return user


def verify_owner(alias: Optional[str] = None):
    if alias is None:
        alias = 'id'

    def verifier(user: User = Depends(get_current_user)):
        if user.id != alias:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    def wrapper(func: Callable):
        def inner(*args, **kwargs):
            dependencies = kwargs.get('dependencies') or []
            dependencies.append(Depends(verifier))
            return func(*args, **kwargs, dependencies=dependencies)

        return inner
    return wrapper


@router.post(
    path='/',
    status_code=status.HTTP_201_CREATED,
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def create(data: CreateUser):
    encrypted = hashpw(data.password.encode('utf-8'), gensalt())

    with Session(engine) as session:
        user = User(
            name=data.name,
            email=data.email,
            password=encrypted,
            created_at=datetime.now(timezone.utc)
        )

        session.add(user)
        session.commit()
        session.refresh(user)

        return user


@verify_owner()
@router.patch(
    path='/{id}',
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def update(id_: int = Path(..., alias='id'), data: UpdateUser = Body(...)):
    with Session(engine) as session:
        stmt = select(User).where(User.id == id_)
        user = session.exec(stmt).one_or_none()

        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

        if data.email != user.email:
            user.email_verified = False

        for k, v in data.dict(exclude_none=True).items():
            if hasattr(user, k):
                setattr(user, k, v)

        user.updated_at = datetime.now(timezone.utc)

        session.add(user)
        session.commit()
        session.refresh(user)

        return user
