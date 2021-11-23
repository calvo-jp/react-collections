# pylint:disable=consider-using-f-sting

from os import getenv

from dotenv import load_dotenv
from pydantic import BaseSettings
from sqlmodel import create_engine

load_dotenv()


class Config(BaseSettings):
    development: bool

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


config = Config()
engine = create_engine(config.pgsql_dsn)
