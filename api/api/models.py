# pylint: disable=consider-using-f-string
from datetime import datetime, timezone
from typing import Generic, List, Optional, TypeVar

from pydantic import EmailStr, validator
from pydantic.generics import GenericModel
from sqlmodel import (Column, DateTime, Field, Relationship, SQLModel, String,
                      default)

from .config import engine
from .utils.validator import validate_url


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class Timestamp(SQLModel):
    created_at: datetime = Field(
        ...,
        sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )


class User(Timestamp, table=True):
    __tablename__: str = 'users'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: EmailStr = Field(
        ...,
        sa_column=Column(String, unique=True, nullable=False)
    )
    email_verified_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )
    password: bytes
    internalonly_avatar: Optional[str] = Field(
        default=None,
        sa_column=Column('avatar', String)
    )

    places: List['Place'] = Relationship(back_populates='author')

    @property
    def email_verified(self):
        return True if isinstance(self.email_verified_at, datetime) else None

    @email_verified.setter
    def email_verified(self, v: bool):
        self.email_verified_at = datetime.now(timezone.utc) if v else None

    @property
    def avatar(self):
        if self.internalonly_avatar is None:
            return None
        return Image(self.internalonly_avatar)

    @avatar.setter
    def avatar(self, v: Optional[str] = None):
        self.internalonly_avatar = v


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: Optional[bool] = None
    email_verified_at: Optional[datetime] = None
    avatar: Optional['ReadImage'] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class CreateUser(SQLModel):
    name: str = Field(..., min_length=2, max_length=25)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=255)

    @validator('email', pre=True)
    @classmethod
    def ensure_email_lcase(cls, value: str):
        return value.lower()


class UpdateUser(SQLModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=25)
    email: Optional[EmailStr] = None

    @validator('email', pre=True)
    @classmethod
    def emailtolowercase(cls, value: Optional[str] = None):
        return None if value is None else value.lower()


class Place(Timestamp, table=True):
    __tablename__: str = 'places'

    id: Optional[int] = Field(default=None, primary_key=True)
    author: User = Relationship(back_populates='places')
    author_id: int = Field(..., foreign_key='users.id')
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[list[str]] = Field(default=[])
    internalonly_image: Optional[str] = Field(
        default=None,
        sa_column=Column('image', String)
    )

    @property
    def image(self):
        if self.internalonly_image is None:
            return None
        return Image(self.internalonly_image)

    @image.setter
    def image(self, v: Optional[str] = None):
        self.internalonly_image = v


class ReadPlace(SQLModel):
    id: int
    author: ReadUser
    url: str
    title: Optional[str] = None
    description: Optional[str] = None
    keywords: Optional[list[str]] = []
    image: Optional['ReadImage'] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class CreatePlace(SQLModel):
    url: str = Field(..., min_length=25, max_length=255)
    title: Optional[str] = Field(default=None, min_length=5, max_length=50)
    description: Optional[str] = Field(
        default=None,
        min_length=20,
        max_length=255
    )
    keywords: Optional[list[str]] = Field(default=[], max_items=15)

    @validator('url')
    @classmethod
    def isurl(cls, value: str):
        assert not validate_url(value), 'Malformed url'
        return value


class UpdatePlace(SQLModel):
    url: Optional[str] = Field(default=None, min_length=25, max_length=255)
    title: Optional[str] = Field(default=None, min_length=5, max_length=50)
    description: Optional[str] = Field(
        default=None,
        min_length=20,
        max_length=255
    )
    keywords: Optional[list[str]] = Field(default=[], max_items=15)

    @validator('url')
    @classmethod
    def isurl(cls, value: Optional[str] = None):
        assert value is not None and not validate_url(value), 'Malformed url'
        return value


class Image:
    def __init__(self, filename: str):
        self.filename = filename

    @property
    def filetype(self):
        pass

    @property
    def filesize(self):
        pass

    @property
    def base64_data(self):
        pass

    @property
    def stream_url(self):
        pass

    # TODO:
    # 1. Add delete magic method to delete the actual image and class instance
    # 2. Add static method to upload image and return instance

    def __repr__(self):
        return "<class 'Image' filename='%s' filetype='%s' filesize=%s>" % (
            self.filename,
            self.filetype,
            self.filesize
        )


class ReadImage(SQLModel):
    filename: str = Field(..., alias='file_name')
    filetype: str = Field(..., alias='file_type')
    filesize: float = Field(..., alias='file_size')
    stream_url: str
    base64_data: str


ReadUser.update_forward_refs()
ReadPlace.update_forward_refs()

PaginatedT = TypeVar('PaginatedT', ReadUser, ReadPlace)


class Paginated(GenericModel, Generic[PaginatedT]):
    rows: list[PaginatedT]
    total_rows: int
    page: int
    page_size: int
    has_next: bool


def create_tables():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
