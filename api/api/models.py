from datetime import datetime, timezone
from typing import Generic, List, Optional, Type, TypeVar

from pydantic import EmailStr, validator
from pydantic.generics import GenericModel
from sqlalchemy import event
from sqlmodel import (ARRAY, Column, DateTime, Field, Relationship, SQLModel,
                      String)

from .config import engine


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


def utcnow_():
    return datetime.now(timezone.utc)


class SQLModelTimestamped(SQLModel):
    created_at: datetime = Field(
        default_factory=utcnow_,
        sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )


@event.listens_for(SQLModelTimestamped, 'before_update')
def update_timestamp(_, table: Type[SQLModelTimestamped]):
    table.updated_at = utcnow_()


class User(SQLModelTimestamped, table=True):
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
    avatar: Optional[str] = None

    recipes: List['Recipe'] = Relationship(back_populates='author')

    @property
    def email_verified(self):
        return isinstance(self.email_verified_at, datetime)

    @email_verified.setter
    def email_verified(self, v: bool):
        self.email_verified_at = utcnow_() if v else None


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: bool
    email_verified_at: Optional[datetime]
    avatar: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]


class CreateUser(SQLModel):
    name: str = Field(..., min_length=2, max_length=25)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=100)

    @validator('email', pre=True)
    @classmethod
    def ensure_lowercase(cls, v: str):
        return v.lower()


class UpdateUser(SQLModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=25)
    email: Optional[EmailStr]

    @validator('email', pre=True)
    @classmethod
    def ensure_lowercase(cls, v: Optional[str] = None):
        if v is None:
            return None
        return v.lower()


class Recipe(SQLModelTimestamped, table=True):
    __tablename__: str = 'recipes'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    author_id: int = Field(..., foreign_key='users.id')
    author: User = Relationship(back_populates='recipes')
    ingredients: list[str] = Field(..., sa_column=Column(ARRAY(String)))
    instructions: list[str] = Field(..., sa_column=Column(ARRAY(String)))
    image: Optional[str] = None
    video: Optional[str] = None


class ReadRecipe(SQLModel):
    id: int
    name: str
    description: str
    author: ReadUser
    ingredients: list[str]
    instructions: list[str]
    image: Optional[str]
    video: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]


class CreateRecipe(SQLModel):
    name: str = Field(..., min_length=4, max_length=50)
    description: str = Field(..., min_length=15, max_length=255)
    ingredients: list[str] = Field(..., min_items=2, max_items=15)
    instructions: list[str] = Field(..., min_items=2, max_items=15)


class UpdateRecipe(SQLModel):
    name: Optional[str] = Field(default=None, min_length=4, max_length=50)
    description: Optional[str] = Field(
        default=None,
        min_length=15,
        max_length=255
    )
    ingredients: Optional[list[str]] = Field(
        default=None,
        min_items=2,
        max_items=15
    )
    instructions: Optional[list[str]] = Field(
        default=None,
        min_items=2,
        max_items=15
    )


PaginatedT = TypeVar('PaginatedT', ReadUser, ReadRecipe)


class Paginated(GenericModel, Generic[PaginatedT]):
    rows: list[PaginatedT]
    total_rows: int
    page: int
    page_size: int
    has_next: bool
    search: Optional[str]


def create_tables():
    SQLModel.metadata.create_all(engine)
