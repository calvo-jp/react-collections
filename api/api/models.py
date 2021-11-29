from datetime import datetime, timezone
from enum import IntEnum, auto
from typing import Generic, List, Optional, TypeVar

from pydantic import validator
from pydantic.generics import GenericModel
from pydantic.networks import EmailStr
from sqlmodel import Column, DateTime, Field, Relationship, SQLModel, String

from .config import engine
from .utils.validator import validate_url


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class Timestamp(SQLModel):
    """Adds timestamps to models"""

    created_at: datetime = Field(
        ..., sa_column=Column(ZonedDateTime, nullable=False))
    updated_at: Optional[datetime] = Field(
        default=None, sa_column=Column(ZonedDateTime))


class UserType(IntEnum):
    BASIC = auto()
    ADMIN = auto()


class User(Timestamp, table=True):
    __tablename__: str = 'users'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: EmailStr = Field(
        ..., sa_column=Column(String, unique=True, nullable=False))
    email_verified_at: Optional[datetime] = Field(
        default=None, sa_column=Column(ZonedDateTime))
    password: bytes
    user_type: UserType
    places: List['Place'] = Relationship(back_populates='author')

    @property
    def email_verified(self):
        return isinstance(self.email_verified_at, datetime)

    @email_verified.setter
    def email_verified(self, value: bool):
        self.email_verified_at = datetime.now(timezone.utc) if value else None

    @property
    def basic(self):
        return True if self.user_type == UserType.BASIC else None

    @property
    def admin(self):
        return True if self.user_type == UserType.ADMIN else None


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: bool
    email_verified_at: Optional[datetime] = None
    basic: Optional[bool] = None
    admin: Optional[bool] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class CreateUser(SQLModel):
    name: str = Field(..., min_length=2, max_length=25)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=50)


class UpdateUser(SQLModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=25)
    email: Optional[EmailStr] = None


class Place(Timestamp, table=True):
    __tablename__: str = 'places'

    id: Optional[int] = Field(default=None, primary_key=True)
    link: str = Field(..., sa_column=Column(String, unique=True))
    name: Optional[str] = None
    author: Optional[User] = Relationship(back_populates='places')
    author_id: Optional[int] = Field(default=None, foreign_key='users.id')

    @property
    def opengraph_metatags(self):
        pass


class ReadPlace(SQLModel):
    id: int
    name: Optional[str] = None
    link: str
    author: Optional[User] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class CreatePlace(SQLModel):
    name: Optional[str] = Field(default=None, min_length=4, max_length=50)
    link: str = Field(..., min_length=30, max_length=255)
    author_id: Optional[int] = Field(default=None, ge=1)

    @validator('link')
    @classmethod
    def validate_url_(cls, value: str):
        assert validate_url(value), 'Malformed url'
        return value


class UpdatePlace(SQLModel):
    name: Optional[str] = Field(default=None, min_length=4, max_length=50)
    link: Optional[str] = Field(
        default=None,
        min_length=30,
        max_length=255
    )

    @validator('link')
    @classmethod
    def validate_url_(cls, value: Optional[str] = None):
        assert value is None or validate_url(value), 'Malformed url'
        return value


PaginatedT = TypeVar('PaginatedT', ReadUser, ReadPlace)


class Paginated(GenericModel, Generic[PaginatedT]):
    page: int
    page_size: int
    rows: list[PaginatedT]
    total_rows: int
    has_next: bool


def generate_models():
    SQLModel.metadata.create_all(engine)
