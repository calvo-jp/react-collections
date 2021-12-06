import os
import secrets
import shutil
import string
import uuid
from typing import Optional

from fastapi import UploadFile

from ..config import config


class UnsupportedFileType(Exception):
    ...


def _randstr(length: Optional[int] = None):
    length = length or 5
    alphabet = string.ascii_letters + string.digits
    return "".join(secrets.choice(alphabet) for _ in range(length))


def upload(
    file: UploadFile, *,
    whitelist: Optional[list[str]] = None,
    prefix: Optional[str] = None
) -> str:
    """
    Uploads a file into the `config.uploads_dir` and returns the filename

    :param whitelist:
    \tlist of allowed files based on `content-type`
    :param prefix:
    \tmost of the time this is unnecessary, but it helps to easily get a unique filename
    and have lesser recursion
    """

    if isinstance(whitelist, list) and file.content_type not in whitelist:
        raise UnsupportedFileType()

    if prefix is None:
        prefix = ""

    filetype = os.path.splitext(file.filename)[-1]
    filename = uuid.uuid4().hex
    filename = prefix + filename + filetype
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        return upload(file, whitelist=whitelist, prefix=_randstr())

    with open(fullpath, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
        return filename


def delete(filename: str):
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        os.remove(fullpath)
