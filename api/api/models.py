from datetime import datetime, timezone
from typing import Optional

from pydantic import EmailStr, validator
from sqlmodel import Column, DateTime, Field, SQLModel, String

from .config import engine


class ZonedDateTime(DateTime):
    """Timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class User(SQLModel, table=True):
    __tablename__: str = 'users'

    id: Optional[int] = Field(..., primary_key=True)
    name: str
    email: EmailStr = Field(
        ...,
        sa_column=Column(String, unique=True)
    )
    email_verified_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )
    password: bytes
    created_at: datetime = Field(
        ...,
        sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )

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


def create_tables():
    SQLModel.metadata.create_all(engine)
