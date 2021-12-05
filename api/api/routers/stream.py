from os import path

from fastapi import APIRouter, status
from fastapi.exceptions import HTTPException
from fastapi.responses import FileResponse

from ..config import config

router = APIRouter(prefix='/streams', tags=['stream'])


@router.get(path='/uploads/{filename}', response_class=FileResponse)
async def view_file(filename: str):
    fullpath = path.join(config.uploads_dir, filename)

    if not path.exists(fullpath):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return fullpath
