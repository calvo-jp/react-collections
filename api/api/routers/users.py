from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlmodel import Session, select

from ..dependencies import get_session
from ..models import ReadUser, User

router = APIRouter(prefix='/users', tags=['users'])


@router.get(
    path='/',
    response_model=list[ReadUser],
    response_model_exclude_none=True
)
async def findall(*, session: Session = Depends(get_session)):
    return session.exec(select(User)).all()


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
