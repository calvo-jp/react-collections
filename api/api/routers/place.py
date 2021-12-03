from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path
from sqlmodel import Session, select

from ..config import engine
from ..models import (CreatePlace, Paginated, Place, ReadPlace, UpdatePlace,
                      User)

router = APIRouter(prefix='/places', tags=['place'])


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
    response_model=Paginated[ReadPlace],
    response_model_exclude_none=True
)
async def readall(query: Query = Depends()):
    with Session(engine) as session:
        stmt = select(User, Place)
        rows = session.exec(stmt).all()

        return rows


@router.get(
    path='/{id}',
    response_model=Paginated[ReadPlace],
    response_model_exclude_none=True
)
async def readone(id_: int = Path(..., alias='id')):
    with Session(engine) as session:
        stmt = select(User, Place).where(Place.id == id_)
        place = session.exec(stmt).one_or_none()

        if place is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

        return place


@router.post(
    path='/',
    status_code=status.HTTP_201_CREATED,
    response_model=ReadPlace,
    response_model_exclude_none=True
)
async def create(data: CreatePlace):
    with Session(engine) as session:
        place = Place(
            url=data.url,
            title=data.title,
            description=data.description,
            keywords=data.keywords,
            author_id=data.author_id,
            created_at=datetime.now(timezone.utc)
        )
