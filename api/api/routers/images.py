from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from ..utils import file_uploader

router = APIRouter(prefix="/images", tags=["images"])


@router.get(path="/{filename}", response_class=FileResponse)
async def view_image(filename: str):
    fileinfo = file_uploader.info(filename)

    if fileinfo is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

    return fileinfo["fullpath"]
