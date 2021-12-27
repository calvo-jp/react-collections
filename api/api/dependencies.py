from functools import lru_cache

from sqlmodel import Session

from .config import config, engine


def get_session():
    with Session(engine) as session:
        yield session


@lru_cache
def get_settings():
    return config
