import enum
from datetime import datetime, timezone
from typing import Optional

from pydantic import EmailStr, validator
from sqlmodel import Column, DateTime, Enum, Field, SQLModel, String

from .config import engine


class ZonedDateTime(DateTime):
    """timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class UserType(str, enum.Enum):
    ADMIN = "admin"
    BASIC = "basic"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(
        ...,
        sa_column=Column(String, unique=True, nullable=False)
    )
    password: bytes
    avatar: Optional[str] = None
    email_verified_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )
    created_at: datetime = Field(
        ...,
        sa_column=Column(ZonedDateTime, nullable=False)
    )
    updated_at: Optional[datetime] = Field(
        default=None,
        sa_column=Column(ZonedDateTime)
    )
    user_type: UserType = Field(
        default=UserType.BASIC,
        sa_column=Column(Enum(UserType), nullable=False)
    )

    @property
    def is_admin(self):
        return self.user_type == UserType.ADMIN

    @property
    def email_verified(self):
        return isinstance(self.email_verified, datetime)

    @email_verified.setter
    def email_verified(self, v: bool):
        self.email_verified_at = datetime.now(timezone.utc) if v else None


class ReadUser(SQLModel):
    id: int
    name: str
    email: EmailStr
    email_verified: bool
    email_verified_at: Optional[datetime]
    avatar: Optional[str]
    is_admin: Optional[bool]
    created_at: datetime
    updated_at: Optional[datetime]

    @validator("email", pre=True)
    @classmethod
    def lower_email(cls, email: EmailStr):
        return email.lower()


class CreateUser(SQLModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=5, max_length=100)


class UpdateUser(SQLModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=50)
    email: Optional[EmailStr]

    @validator("email", pre=True)
    @classmethod
    def lower_email(cls, email: EmailStr | None = None):
        if email is None:
            return None

        return email.lower()


def generate_tables():
    SQLModel.metadata.create_all(bind=engine)
