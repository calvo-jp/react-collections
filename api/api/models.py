from datetime import datetime
from typing import Optional

from sqlmodel import Column, DateTime, Field, SQLModel, String

from .config import engine


class ZonedDateTime(DateTime):
    """timestamp with timezone"""

    def __init__(self):
        super().__init__(timezone=True)


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str = Field(
        ...,
        sa_column=Column(String, unique=True, nullable=False)
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


def generate_tables():
    SQLModel.metadata.create_all(bind=engine)
