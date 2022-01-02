from typing import Literal, Optional

from fastapi import APIRouter, status
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, File, Path, Query
from fastapi.responses import Response
from sqlmodel import Session, func, select

from ..dependency import SearchParams, get_current_user, get_session
from ..models import (CreateRecipe, Paginated, ReadRecipe, Recipe,
                      UpdateRecipe, User)
from ..utils import file_uploader

router = APIRouter(prefix='/recipes', tags=['recipe'])


class RecipeSearchParams(SearchParams):
    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(default=None, ge=1, le=100),
        search: Optional[str] = None,
        author_id: Optional[int] = None
    ):
        super().__init__(page=page, page_size=page_size, search=search)

        self.author_id = author_id


@router.get(path='/', response_model=Paginated[ReadRecipe], response_model_exclude_none=True)
async def findall(
    *,
    params: RecipeSearchParams = Depends(),
    session: Session = Depends(get_session),
    response: Response
):
    stmt = select(Recipe)

    if params.author_id is not None:
        stmt = stmt.where(Recipe.author_id == params.author_id)

    # TODO: implement a fulltext search
    if params.search is not None:
        pass

    # actual total number of matching records
    totalrows: int = session.execute(
        stmt.with_only_columns(func.count(Recipe.id))
    ).scalar_one()

    rows = session.exec(
        stmt
        .limit(params.limit)
        .offset(params.offset)
    ).all()

    # is there still a next page?
    hasnext = totalrows > params.page * params.limit

    # assume we are on the last page
    response.status_code = status.HTTP_200_OK

    # we are not on the last page yet
    if hasnext:
        response.status_code = status.HTTP_206_PARTIAL_CONTENT

    # page does not exist (404) if
    # user navigates to a certain page other than page 1
    # and no more records are found
    if params.page > 1 and not hasnext and len(rows) == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return dict(
        rows=rows,
        total_rows=totalrows,
        page=params.page,
        page_size=params.limit,
        has_next=hasnext,
        search=params.search
    )


@router.get(path='/{id}', response_model=ReadRecipe, response_model_exclude_none=True)
async def findone(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
    recipe = session.get(Recipe, id_)

    if recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return recipe


@router.post(
    path='/',
    status_code=status.HTTP_201_CREATED,
    response_model=ReadRecipe,
    response_model_exclude_none=True
)
async def create(
    *,
    data: CreateRecipe,
    author: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    # make pylance happy
    if author.id is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE)

    recipe = Recipe(
        name=data.name,
        description=data.description,
        ingredients=data.ingredients,
        instructions=data.instructions,
        author_id=author.id,
    )

    session.add(recipe)
    session.commit()
    session.refresh(recipe)

    return recipe


async def findone_strict(
    *,
    id_: int = Path(..., alias='id'),
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    """gets the recipe, but validates if current user owns the recipe"""

    recipe = session.get(Recipe, id_)

    if recipe is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    if user.id != recipe.author_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    return recipe


@router.patch(path='/{id}', response_model=ReadRecipe, response_model_exclude_none=True)
async def update(
    *,
    data: UpdateRecipe,
    recipe: Recipe = Depends(findone_strict),
    session: Session = Depends(get_session)
):
    for k, v in data.dict(exclude_none=True).items():
        setattr(recipe, k, v)

    session.add(recipe)
    session.commit()
    session.refresh(recipe)

    return recipe


@router.delete(path='/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    *,
    recipe: Recipe = Depends(findone_strict),
    session: Session = Depends(get_session)
):
    session.delete(recipe)
    session.commit()


Media = Literal[
    "video",
    "image"
]


@router.put(path='/{id}/{media}', response_model=ReadRecipe, response_model_exclude_none=True)
async def upload_file(
    *,
    file: UploadFile = File(...),
    media: Media,
    recipe: Recipe = Depends(findone_strict),
    session: Session = Depends(get_session),
    response: Response,
):
    status_code = status.HTTP_201_CREATED

    if getattr(recipe, media) is not None:
        status_code = status.HTTP_200_OK

        file_uploader.delete(getattr(recipe, media))

    whitelist = dict(
        image=[
            'image/jpeg',
            'image/jpg',
            'image/png',
        ],
        video=[
            'video/mp4'
        ]
    )

    try:
        uploaded = file_uploader.upload(file, whitelist=whitelist[media])

        setattr(
            recipe,
            media,
            uploaded['filename']
        )

        session.add(recipe)
        session.commit()
        session.refresh(recipe)

        response.status_code = status_code

        return recipe
    except file_uploader.UnsupportedFileType as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Unsupported file type'
        ) from error


@router.delete(path='/{id}/{media}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_uploaded_file(
    *,
    media: Media,
    recipe: Recipe = Depends(findone_strict),
    session: Session = Depends(get_session)
):
    if getattr(recipe, media) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    file_uploader.delete(getattr(recipe, media))

    setattr(recipe, media, None)

    session.add(recipe)
    session.commit()
