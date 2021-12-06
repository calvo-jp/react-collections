import os

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.responses import FileResponse

from ..config import config

router = APIRouter(prefix='/streams', tags=['stream'])


@router.get(path='/uploads/{filename}', response_class=FileResponse)
async def view_file(*, filename: str):
    fullpath = os.path.join(config.uploads_dir, filename)

    if not os.path.exists(fullpath):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return fullpath
