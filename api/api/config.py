# pylint: disable=consider-using-f-string
from typing import Optional

from pydantic import BaseSettings
from sqlmodel import create_engine


class Config(BaseSettings):
    env: Optional[str]

    pgsql_host: str
    pgsql_port: int
    pgsql_user: str
    pgsql_password: str
    pgsql_database: str

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


config = Config()
engine = create_engine(url=config.pgsql_dsn, echo=config.debug)
