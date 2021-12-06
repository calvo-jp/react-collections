import os
import shutil
import uuid
from typing import Optional

from fastapi import UploadFile

from ..config import config


class UnsupportedFileType(Exception):
    ...


def upload(file: UploadFile, *, whitelist: Optional[list[str]] = None) -> str:
    """
    Uploads a file into the `config.uploads_dir` and returns the filename

    :param whitelist:
    \tlist of allowed files based on `content-type`
    """

    if isinstance(whitelist, list) and file.content_type not in whitelist:
        raise UnsupportedFileType()

    filetype = os.path.splitext(file.filename)[-1]
    filename = uuid.uuid4().hex
    filename = filename + filetype
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        return upload(file, whitelist=whitelist)

    with open(fullpath, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        return filename


def delete(filename: str):
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        os.remove(fullpath)
