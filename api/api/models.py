from datetime import datetime, timezone
from typing import Generic, Optional, TypeVar

from pydantic.generics import GenericModel
from pydantic.networks import EmailStr
from sqlmodel import Column, DateTime, Field, SQLModel, String

from .config import engine


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


class User(Timestamp, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: EmailStr = Field(
        ..., sa_column=Column(String, unique=True, nullable=False))
    email_verified_at: Optional[datetime] = Field(
        default=None, sa_column=Column(ZonedDateTime))
    password: bytes

    @property
    def email_verified(self):
        return isinstance(self.email_verified_at, datetime)

    @email_verified.setter
    def email_verified(self, value: bool):
        self.email_verified_at = datetime.now(timezone.utc) if value else None


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: bool
    email_verified_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None


class CreateUser(SQLModel):
    name: str = Field(..., min_length=2, max_length=25)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=50)


class UpdateUser(SQLModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=25)
    email: Optional[EmailStr] = None


PaginatedT = TypeVar('PaginatedT')


class Paginated(GenericModel, Generic[PaginatedT]):
    page: int
    page_size: int
    rows: list[PaginatedT]
    total_rows: int
    has_next: bool


def generate_models():
    """Creates database tables. Also, creates database for sqlite"""

    SQLModel.metadata.create_all(engine)
