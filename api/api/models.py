from datetime import datetime, timezone
from typing import Optional

from pydantic.networks import EmailStr
from sqlmodel import Column, DateTime, Field, SQLModel, String

from .config import engine


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self, timezone: bool = ...):
        super().__init__(timezone=timezone)


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
    def email_verified(self, v: bool):
        self.email_verified_at = datetime.now(timezone.utc) if v else None


def generate_models():
    """Creates database tables. Also, creates database for sqlite"""

    SQLModel.metadata.create_all(engine)
