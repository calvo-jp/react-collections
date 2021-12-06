from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, Path
from sqlmodel import Session

from ..dependency import get_session
from ..models import ReadUser, User

router = APIRouter(prefix='/users', tags=['user'])


@router.get(path='/{id}', response_model=ReadUser, response_model_exclude_none=True)
async def read_one(
    *,
    id_: int = Path(..., alias='id'),
    session: Session = Depends(get_session)
):
    user = session.get(User, id_)

    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return user
