from datetime import datetime, timezone

from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Body, Path
from sqlmodel import Session, select

from ..config import engine
from ..models import CreatePlace, Paginated, Place, ReadPlace, UpdatePlace

router = APIRouter(prefix='/places', tags=['places'])


@router.get(
    path='/',
    response_model=Paginated[ReadPlace],
    response_model_exclude_none=True
)
async def read_all():
    stmt = select(Place)

    with Session(engine) as session:
        data = session.exec(stmt).all()

        return dict(
            page=1,
            rows=data,
            total_rows=0,
            page_size=15,
            has_next=False
        )


@router.get(
    path='/{id}',
    response_model=ReadPlace,
    response_model_exclude_none=True
)
async def read_one(id_: int = Path(..., alias='id')):
    with Session(engine) as session:
        stmt = select(Place).where(Place.id == id_)
        place = session.exec(stmt).one_or_none()

        if place is None:
            raise HTTPException(404, 'Place does not exist')

        return place


@router.get(
    path='/',
    status_code=201,
    response_model=ReadPlace,
    response_model_exclude_none=True
)
async def create(data: CreatePlace):
    with Session(engine) as session:
        place = Place(
            name=data.name,
            link=data.link,
            author_id=data.author_id,
            created_at=datetime.now(timezone.utc)
        )

        session.add(place)
        session.commit()
        session.refresh(place)

        return place


@router.get(
    path='/{id}',
    response_model=ReadPlace,
    response_model_exclude_none=True
)
async def update(id_: int = Path(..., alias='id'), data: UpdatePlace = Body(...)):
    with Session(engine) as session:
        stmt = select(Place).where(Place.id == id_)
        place = session.exec(stmt).one_or_none()

        if place is None:
            raise HTTPException(404, 'Place does not exist')

        for attr, value in data.dict(exclude_none=True).items():
            if hasattr(place, attr):
                setattr(place, attr, value)

        place.updated_at = datetime.now(timezone.utc)

        session.add(place)
        session.commit()
        session.refresh(place)

        return place


@router.delete(path='/{id}', status_code=204)
async def delete(id_: int = Path(..., alias='id')):
    with Session(engine) as session:
        stmt = select(Place).where(Place.id == id_)
        place = session.exec(stmt).one_or_none()

        if place is None:
            raise HTTPException(404, 'Place does not exist')

        session.delete(place)
        session.commit()
