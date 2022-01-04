
from datetime import datetime, timezone
from typing import Optional

from sqlmodel import Column, DateTime, Field, SQLModel

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


def create_tables():
    SQLModel.metadata.create_all(engine)
