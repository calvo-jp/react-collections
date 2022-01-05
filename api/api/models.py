
from datetime import datetime, timezone
from typing import List, Optional

from sqlmodel import Column, DateTime, Field, Relationship, SQLModel, String

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
        ..., sa_column=Column(String, unique=True, nullable=False)
    )
    households: List['Household'] = Relationship(back_populates="purok")


class Household(SQLModelTimestamped, table=True):
    __tablename__: str = "households"

    id: int = Field(default=None, primary_key=True)
    code: str = Field(
        ..., sa_column=Column(String, unique=True, nullable=False)
    )
    purok: Purok = Relationship(back_populates="households")
    purok_id: int = Field(..., foreign_key="puroks.id")
    total_families: int = Field(default=1)


def create_tables():
    SQLModel.metadata.create_all(engine)
