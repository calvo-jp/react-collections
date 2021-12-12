from enum import Enum
from typing import Optional

from pydantic import BaseSettings
from sqlmodel import create_engine


class Environment(str, Enum):
    PRODUCTION = 'production'
    DEVELOPMENT = 'development'


class Settings(BaseSettings):
    env: Optional[Environment]

    pgsql_host: str
    pgsql_port: int
    pgsql_user: str
    pgsql_password: str
    pgsql_database: str

    @property
    def debug(self):
        return self.env == Environment.DEVELOPMENT

    @property
    def pgsql_dsn(self):
        """postgres database url"""

        return 'postgresql+psycopg2://%s:%s@%s:%s/%s' % (
            self.pgsql_user,
            self.pgsql_password,
            self.pgsql_host,
            self.pgsql_port,
            self.pgsql_database
        )

    class Config:
        env_file = ".env"


config = Settings()
engine = create_engine(url=config.pgsql_dsn, echo=config.debug)
