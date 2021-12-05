from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, status
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, File, Path
from pydantic import BaseModel, Field
from sqlmodel import Session, select

from ..dependencies import get_current_user, get_session
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
async def readall(*, query: Query = Depends(), session: Session = Depends(get_session)):
    stmt = select(Place)
    rows = session.exec(stmt).all()

    return rows


@router.get(
    path='/{id}',
    response_model=Paginated[ReadPlace],
    response_model_exclude_none=True
)
async def readone(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
    stmt = select(User, Place).where(Place.id == id_)
    place = session.exec(stmt).one_or_none()

    if place is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return place


@router.post(
    path='/',
    status_code=status.HTTP_201_CREATED,
    response_model=ReadPlace,
    response_model_exclude_none=True,
)
async def create(
    *,
    data: CreatePlace,
    author: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # just making pylance happy here
    if author.id is None:
        raise HTTPException(503)

    place = Place(
        url=data.url,
        title=data.title,
        description=data.description,
        author_id=author.id,
        created_at=datetime.now(timezone.utc)
    )

    session.add(place)
    session.commit()
    session.refresh(place)

    return place


def verify_owner(
    *,
    id_: int = Path(..., alias='id'),
    author: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """verifies current user owns the record"""

    stmt = select(Place).where(id_ == Place.id)
    place = session.exec(stmt).one_or_none()

    if place is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if place.author.id != author.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    return place


class UploadResponse(BaseModel):
    image: str = Field(..., description='Stream url')


@router.put(
    path='/{id}/image',
    response_model=UploadResponse,
    response_model_exclude_none=True
)
async def upload(
    *,
    place: Place = Depends(verify_owner),
    image: UploadFile = File(...),
    session: Session = Depends(get_session)
):
    # TODO: upload image
    place.image = image.filename
    place.updated_at = datetime.now(timezone.utc)

    session.add(place)
    session.commit()
    session.refresh(place)

    return place


@router.patch(path='/{id}', response_model=ReadPlace, response_model_exclude_none=True)
async def update(
    *,
    place: Place = Depends(verify_owner),
    data: UpdatePlace,
    session: Session = Depends(get_session)
):
    for k, v in data.dict(exclude_none=True).items():
        if hasattr(place, k):
            setattr(place, k, v)

    place.updated_at = datetime.now(timezone.utc)

    session.add(place)
    session.commit()
    session.refresh(place)

    return place
