from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, status
from fastapi.datastructures import UploadFile
from fastapi.exceptions import HTTPException
from fastapi.param_functions import Depends, File, Path
from fastapi.responses import Response
from sqlmodel import Session, func, select

from ..dependency import get_current_user, get_session
from ..models import (CreateRecipe, Paginated, ReadRecipe, Recipe,
                      UpdateRecipe, User)
from ..utils import file_uploader

router = APIRouter(prefix='/recipes', tags=['recipe'])


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


@router.get(path='/', response_model=Paginated[ReadRecipe], response_model_exclude_none=True)
async def read_all(
    *,
    query: Query = Depends(),
    session: Session = Depends(get_session),
    response: Response
):
    stmt = select(Recipe)

    if query.author_id:
        stmt = stmt.where(Recipe.author_id == query.author_id)

    # TODO: implement a fulltext search
    if query.search:
        pass

    total_rows: int = session.execute(
        stmt.with_only_columns(func.count(Recipe.id))
    ).scalar_one()

    rows = session.exec(
        stmt.limit(query.page_size).offset((query.page - 1) * query.page_size)
    ).all()

    has_next = total_rows > query.page * query.page_size
    response.status_code = status.HTTP_206_PARTIAL_CONTENT if has_next else status.HTTP_200_OK

    return dict(
        page=query.page,
        page_size=query.page_size,
        total_rows=total_rows,
        rows=rows,
        has_next=has_next
    )


@router.get(path='/{id}', response_model=ReadRecipe, response_model_exclude_none=True)
async def read_one(*, id_: int = Path(..., alias='id'), session: Session = Depends(get_session)):
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
        created_at=datetime.now(timezone.utc),
    )

    session.add(recipe)
    session.commit()
    session.refresh(recipe)

    return recipe


async def get_recipe_strict(
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
    recipe: Recipe = Depends(get_recipe_strict),
    session: Session = Depends(get_session)
):
    for k, v in data.dict(exclude_none=True).items():
        if hasattr(recipe, k):
            setattr(recipe, k, v)

        recipe.updated_at = datetime.now(timezone.utc)

    session.add(recipe)
    session.commit()
    session.refresh(recipe)

    return recipe


@router.delete(path='/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete(
    *,
    recipe: Recipe = Depends(get_recipe_strict),
    session: Session = Depends(get_session)
):
    session.delete(recipe)
    session.commit()


@router.put(path='/{id}/image', response_model=ReadRecipe, response_model_exclude_none=True)
async def upsert_image(
    *,
    image: UploadFile = File(...),
    recipe: Recipe = Depends(get_recipe_strict),
    session: Session = Depends(get_session),
    response: Response,
):
    status_code = status.HTTP_201_CREATED
    if recipe.image is not None:
        status_code = status.HTTP_200_OK
        file_uploader.delete(recipe.image)

    whitelist = [
        'image/jpeg',
        'image/jpe',
        'image/jpg',
        'image/png',
    ]

    try:
        recipe.image = file_uploader.upload(image, whitelist=whitelist)
        recipe.updated_at = datetime.now(timezone.utc)

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


@router.delete(path='/{id}/image', status_code=status.HTTP_204_NO_CONTENT)
async def delete_image(
    *,
    recipe: Recipe = Depends(get_recipe_strict),
    session: Session = Depends(get_session)
):
    if recipe.image is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    file_uploader.delete(recipe.image)

    recipe.image = None
    recipe.updated_at = datetime.now(timezone.utc)

    session.add(recipe)
    session.commit()
