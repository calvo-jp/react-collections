from typing import Optional

from bcrypt import gensalt, hashpw
from fastapi import APIRouter, Depends, HTTPException, Path, Query, status
from sqlmodel import Session, select

from ..dependencies import SearchParams, get_session
from ..models import CreateUser, Household, Paginated, Purok, ReadUser, User

router = APIRouter(prefix='/users', tags=['users'])


class UserSearchParams(SearchParams):
    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(default=None, ge=25, le=100),
        search: Optional[str] = None,
    ):
        super().__init__(page=page, page_size=page_size, search=search)


@router.get(
    path='/',
    response_model=Paginated[ReadUser],
    response_model_exclude_none=True
)
async def findall(
    *,
    params: UserSearchParams = Depends(),
    session: Session = Depends(get_session)
):
    rows = session.exec(
        select(User)
        .limit(params.limit)
        .offset(params.offset)
    ).all()

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


@router.post(
    path='/',
    response_model=ReadUser,
    response_model_exclude_none=True,
    status_code=status.HTTP_201_CREATED
)
async def create(
    *,
    data: CreateUser,
    session: Session = Depends(get_session)
):

    user = User(
        first_name=data.name.first,
        middle_name=data.name.middle,
        last_name=data.name.last,
        suffix=data.name.suffix,
        date_of_birth=data.date_of_birth,
        gender=data.gender,
        marital=data.marital,
        email=data.email,
        username=data.username,
        phone_number=data.phone_number,
        employment_status=data.employment_status,
        educational_attainment=data.educational_attainment,
    )

    if data.password is not None:
        user.password = hashpw(data.password.encode('utf-8'), gensalt())

    if data.household_id is not None:
        rows = session.exec(
            select(Household, Purok)
            .where(Household.id == data.household_id)
            .limit(1)
        ).one_or_none()

        if rows is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Household not found'
            )

        household, purok = rows

        if data.purok_id is not None and data.purok_id != purok.id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

        user.purok = purok
        user.household = household

    elif data.purok_id is not None:
        purok = session.get(Purok, data.purok_id)

        if purok is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='Purok not found'
            )

        user.purok = purok

    else:
        pass

    session.add(user)
    session.commit()
    session.refresh(user)

    return user
