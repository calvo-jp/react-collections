# pylint: disable=consider-using-f-string
from os import mkdir, path
from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseSettings
from sqlmodel import create_engine

load_dotenv()


class Config(BaseSettings):
    env: Optional[str]

    pgsql_host: str
    pgsql_port: int
    pgsql_user: str
    pgsql_password: str
    pgsql_database: str

    redis_host: str
    redis_port: int

    access_token_secret: str

    @property
    def debug(self):
        return self.env == 'development'

    @property
    def pgsql_dsn(self):
        """postgresql database url"""

        return 'postgresql+psycopg2://%s:%s@%s:%s/%s' % (
            self.pgsql_user,
            self.pgsql_password,
            self.pgsql_host,
            self.pgsql_port,
            self.pgsql_database
        )

    @property
    def uploads_dir(self):
        fullpath = path.abspath('.uploads')

        if not path.exists(fullpath):
            mkdir(fullpath)

        return fullpath


config = Config()
engine = create_engine(url=config.pgsql_dsn, echo=config.debug)
