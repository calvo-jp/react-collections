# pylint:disable=consider-using-f-string

from enum import Enum
from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseSettings
from sqlmodel import create_engine

load_dotenv()


class Env(str, Enum):
    PRODUCTION = 'production'
    DEVELOPMENT = 'development'


class Config(BaseSettings):
    env: Optional[Env] = None

    pgsql_host: str
    pgsql_port: int
    pgsql_user: str
    pgsql_password: str
    pgsql_database: str

    redis_host: str
    redis_port: int

    access_token_secretkey: str

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
    def production(self):
        """true if environment is set to production"""

        return self.env == Env.PRODUCTION


config = Config()
engine = create_engine(config.pgsql_dsn)
