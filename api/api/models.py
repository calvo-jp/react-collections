
from datetime import datetime, timezone
from typing import Optional

from sqlmodel import Column, DateTime, Field, SQLModel, String

from .config import engine


class ZonedDateTime(DateTime):
    """Timestamp with timezone table column"""

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
        sa_column=Column(ZonedDateTime, onupdate=utcnow_),
    )


class Purok(SQLModelTimestamped, table=True):
    __tablename__: str = "puroks"

    id: int = Field(default=None, primary_key=True)
    name: str = Field(
        ...,
        sa_column=Column(String, unique=True, nullable=False)
    )


def create_tables():
    SQLModel.metadata.create_all(engine)
