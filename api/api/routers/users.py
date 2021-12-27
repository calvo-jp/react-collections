from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from sqlmodel import Session, select

from ..dependencies import get_session
from ..models import Paginated, ReadUser, User

router = APIRouter(prefix='/users', tags=['users'])


class SearchParams:
    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(default=None, ge=25, le=100),
        search: Optional[str] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search


@router.get(
    path='/',
    response_model=Paginated[ReadUser],
    response_model_exclude_none=True
)
async def findall(
    *,
    params: SearchParams = Depends(),
    session: Session = Depends(get_session)
):
    rows = session.exec(select(User)).all()

    return Paginated(
        rows=rows,
        total_rows=0,
        page=params.page,
        page_size=params.page_size,
        has_next=False,
        search=params.search
    )


@router.get(
    path='/{id}',
    response_model=ReadUser,
    response_model_exclude_none=True
)
async def findone(
    *,
    id_: int = Path(..., alias='id'),
    session: Session = Depends(get_session)
):
    user = session.get(User, id_)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return user
