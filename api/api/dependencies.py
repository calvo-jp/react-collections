from sqlmodel import Session

from .config import engine


def get_config():
    with Session(engine) as session:
        yield session
