import os
import secrets
import shutil
import string
import uuid
from typing import Optional, TypedDict

from fastapi import UploadFile

from ..config import config


class FileUploadError(Exception):
    ...


class UnsupportedFile(FileUploadError):
    ...


class UploadedFile(TypedDict):
    filename: str
    fullpath: str


def randstr(length: Optional[int] = None):
    alphabet = string.ascii_letters + string.digits

    if length is None:
        length = 5

    return "".join(secrets.choice(alphabet) for _ in range(length))


def upload(
    file: UploadFile, *,
    whitelist: Optional[list[str]] = None,
    prefix: Optional[str] = None
) -> UploadedFile:
    """
    Uploads a file into the `config.uploads_dir` and returns the filename

    :param whitelist:
    \tlist of allowed files based on `content-type`
    :param prefix:
    \tmost of the time this is unnecessary, but it helps to easily get a unique filename
    and have lesser recursion
    """

    if isinstance(whitelist, list) and file.content_type not in whitelist:
        raise UnsupportedFile()

    if prefix is None:
        prefix = ""

    filetype = os.path.splitext(file.filename)[-1]
    filename = prefix + uuid.uuid4().hex + filetype
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        return upload(file, whitelist=whitelist, prefix=randstr())

    with open(fullpath, mode="wb", encoding="utf-8") as buffer:
        shutil.copyfileobj(file.file, buffer)

        return UploadedFile(
            filename=filename,
            fullpath=fullpath
        )


def remove(filename: str):
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        os.remove(fullpath)


def info(filename: str):
    fullpath = os.path.join(config.uploads_dir, filename)

    if os.path.exists(fullpath):
        return None

    return UploadedFile(
        filename=filename,
        fullpath=fullpath
    )
