from datetime import datetime, timezone
from typing import Generic, List, Optional, TypeVar

from pydantic import EmailStr, HttpUrl
from pydantic.generics import GenericModel
from sqlmodel import Column, DateTime, Field, Relationship, SQLModel, String

from .config import engine


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class Timestamp(SQLModel):
    created_at: datetime = Field(
        ..., sa_column=Column(ZonedDateTime, nullable=False))
    updated_at: Optional[datetime] = Field(
        default=None, sa_column=Column(ZonedDateTime))


class User(Timestamp, table=True):
    __tablename__: str = 'users'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: EmailStr = Field(
        ..., sa_column=Column(String, unique=True, nullable=False))
    email_verified_at: Optional[datetime] = Field(
        default=None, sa_column=Column(ZonedDateTime))
    password: bytes
    places: List['Place'] = Relationship(back_populates='author_id')

    @property
    def email_verified(self):
        return True if isinstance(self.email_verified_at, datetime) else None

    @email_verified.setter
    def email_verified(self, v: bool):
        self.email_verified_at = datetime.now(timezone.utc) if v else None


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: Optional[bool] = None
    email_verified_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class CreateUser(SQLModel):
    name: str = Field(..., min_length=2, max_length=25)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=255)


class UpdateUser(SQLModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=25)
    email: Optional[EmailStr] = None


PaginatedT = TypeVar('PaginatedT')


class Paginated(GenericModel, Generic[PaginatedT]):
    rows: list[PaginatedT]
    total_rows: int
    page: int
    page_size: int
    has_next: bool


class Place(Timestamp, table=True):
    __tablename__: str = 'places'

    id: Optional[int] = Field(default=None, primary_key=True)
    author: User = Relationship(back_populates='places')
    author_id: int = Field(..., foreign_key='users.id')
    url: str = Field(
        ..., sa_column=Column(String, unique=True, nullable=False))
    title: str
    description: str
    keywords: set[str]
    image: Optional[str] = None


def create_tables():
    SQLModel.metadata.create_all(engine)
