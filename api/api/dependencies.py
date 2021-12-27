from functools import lru_cache
from typing import Optional

from fastapi import Query
from sqlmodel import Session

from .config import config, engine


def get_session():
    with Session(engine) as session:
        yield session


@lru_cache
def get_settings():
    return config


class SearchParams:
    """Pagination search queries"""

    def __init__(
        self,
        *,
        page: Optional[int] = Query(default=None, ge=1),
        page_size: Optional[int] = Query(default=None, ge=25, le=100),
        search: Optional[str] = None
    ):
        self.page = page or 1
        self.page_size = page_size or 25
        self.search = search

    @property
    def offset(self):
        return (self.page - 1) * self.page_size

    @property
    def limit(self):
        return self.page_size
