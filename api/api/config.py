# pylint: disable=consider-using-f-string

from enum import Enum
from os import path
from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseSettings
from sqlmodel import create_engine

load_dotenv()


class Environment(str, Enum):
    DEVELOPMENT = 'development'
    PRODUCTION = 'production'


class Config(BaseSettings):
    env: Optional[Environment]

    pgsql_host: str
    pgsql_port: int
    pgsql_user: str
    pgsql_password: str
    pgsql_database: str

    redis_host: str
    redis_port: int

    access_token_secret: str
    refresh_token_secret: str

    @property
    def uploads_dir(self):
        return path.abspath(".uploads")

    @property
    def debug(self):
        return self.env == Environment.DEVELOPMENT

    @property
    def pgsql_dsn(self):
        """postgresql database connection string"""

        return 'postgresql://%s:%s@%s:%s/%s' % (
            self.pgsql_user,
            self.pgsql_password,
            self.pgsql_host,
            self.pgsql_port,
            self.pgsql_database
        )


config = Config()
engine = create_engine(url=config.pgsql_dsn, echo=config.debug)

print(config.uploads_dir)
