from datetime import datetime, timezone
from typing import Generic, List, Optional, TypeVar

from pydantic import EmailStr, validator
from pydantic.generics import GenericModel
from sqlmodel import (ARRAY, Column, DateTime, Field, Relationship, SQLModel,
                      String)

from .config import engine


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class User(SQLModel, table=True):
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
    avatar: Optional['Attachment'] = Relationship()
    avatar_id: Optional[int] = Field(
        default=None,
        foreign_key='attachments.id'
    )
    created_at: datetime = Field(
        ...,
        sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )

    recipes: List['Recipe'] = Relationship(back_populates='author')

    @property
    def email_verified(self):
        return isinstance(self.email_verified_at, datetime)

    @email_verified.setter
    def email_verified(self, v: bool):
        self.email_verified_at = datetime.now(timezone.utc) if v else None


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: bool
    email_verified_at: Optional[datetime] = None
    avatar: Optional['ReadAttachment'] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


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
    email: Optional[EmailStr] = None

    @validator('email', pre=True)
    @classmethod
    def ensure_lowercase(cls, v: Optional[str] = None):
        if v is None:
            return None
        return v.lower()


class Recipe(SQLModel, table=True):
    __tablename__: str = 'recipes'

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    description: str
    author_id: int = Field(..., foreign_key='users.id')
    author: User = Relationship(back_populates='recipes')
    ingredients: list[str] = Field(
        ...,
        sa_column=Column(ARRAY(String))
    )
    instructions: list[str] = Field(
        ...,
        sa_column=Column(ARRAY(String))
    )
    created_at: datetime
    updated_at: Optional[datetime] = None


class ReadRecipe(SQLModel):
    id: int
    name: str
    description: str
    author: ReadUser
    ingredients: Optional[list[str]] = []
    instructions: Optional[list[str]] = []
    created_at: datetime
    updated_at: Optional[datetime] = None


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


class Attachment(SQLModel, table=True):
    __tablename__: str = 'attachments'

    id: Optional[int] = Field(default=None, primary_key=True)
    file_name: str = Field(..., sa_column=Column(String, unique=True))

    @property
    def file_type(self):
        return ""

    @property
    def file_size(self):
        return ""

    @property
    def dimension(self) -> tuple[float, float]:
        return (0, 0)

    @property
    def stream_url(self):
        return ""

    @property
    def base64_data(self):
        return ""


class ReadAttachment(SQLModel):
    id: int
    file_name: str
    file_size: str
    file_type: str
    dimension: Optional[tuple[float, float]] = Field(
        default=None,
        description='width and height'
    )
    stream_url: str
    base64_data: str


ReadUser.update_forward_refs()


PaginatedT = TypeVar('PaginatedT', ReadUser, ReadRecipe)


class Paginated(GenericModel, Generic[PaginatedT]):
    rows: list[PaginatedT]
    total_rows: int
    page: int
    page_size: int
    has_next: bool


def create_tables():
    SQLModel.metadata.create_all(engine)
