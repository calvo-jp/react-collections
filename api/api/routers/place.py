from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, status
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, File, Path
from fastapi.responses import Response
from sqlmodel import Session, func, select

from ..dependencies import get_current_user, get_session
from ..models import (CreatePlace, Paginated, Place, ReadPlace, UpdatePlace,
                      User)
from ..utils import file_uploader

router = APIRouter(prefix='/places', tags=['place'])


class Query:
    def __init__(
        self,
        *,
        page: Optional[int] = None,
        page_size: Optional[int] = None,
        search: Optional[str] = None,
        author_id: Optional[int] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search
        self.author_id = author_id


@router.get(
    path='/',
    response_model=Paginated[ReadPlace],
    response_model_exclude_none=True
)
async def read_all(
    *,
    query: Query = Depends(),
    session: Session = Depends(get_session),
    response: Response
):
    stmt = select(Place)

    if query.author_id:
        stmt = stmt.where(Place.author_id == query.author_id)

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
        page=query.page,
        page_size=query.page_size,
        total_rows=totalrows,
        rows=rows,
        has_next=hasnext
    )


@router.get(
    path='/{id}',
    response_model=ReadPlace,
    response_model_exclude_none=True
)
async def read_one(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
    place = session.get(Place, id_)

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
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE)

    place = Place(
        url=data.url,
        title=data.title,
        description=data.description,
        keywords=data.keywords,
        author_id=author.id,
        created_at=datetime.now(timezone.utc)
    )

    session.add(place)
    session.commit()
    session.refresh(place)

    return place


def get_place_strict(
    *,
    id_: int = Path(..., alias='id'),
    author: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """verifies current user owns the record before returning the data"""

    place = session.get(Place, id_)

    if place is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if place.author.id != author.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    return place


@router.patch(path='/{id}', response_model=ReadPlace, response_model_exclude_none=True)
async def update(
    *,
    place: Place = Depends(get_place_strict),
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


@router.delete(path='/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    *,
    place: Place = Depends(get_place_strict),
    session: Session = Depends(get_session)
):
    session.delete(place)
    session.commit()


@router.put(
    path='/{id}/image',
    response_model=ReadPlace,
    response_model_exclude_none=True
)
async def upsert_image(
    *,
    place: Place = Depends(get_place_strict),
    image: UploadFile = File(...),
    session: Session = Depends(get_session),
    response: Response
):
    response.status_code = status.HTTP_201_CREATED

    if place.image is not None:
        file_uploader.delete(place.image)

        response.status_code = status.HTTP_200_OK

    place.image = file_uploader.upload(image)
    place.updated_at = datetime.now(timezone.utc)

    session.add(place)
    session.commit()
    session.refresh(place)

    return place


@router.delete(path='/{id}/image', status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(
    *,
    place: Place = Depends(get_place_strict),
    session: Session = Depends(get_session),
):
    if place.image is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    file_uploader.delete(place.image)

    place.image = None
    place.updated_at = datetime.now(timezone.utc)

    session.add(place)
    session.commit()
