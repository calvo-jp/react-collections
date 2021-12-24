from sqlmodel import Session

from .config import engine


def get_settings():
    with Session(engine) as session:
        yield session
