from typing import Optional

from pydantic import BaseSettings
from sqlmodel import create_engine


class Settings(BaseSettings):
    env: Optional[str] = None

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
        """postgres database url"""

        return 'postgresql+psycopg2://%s:%s@%s:%s/%s' % (
            self.pgsql_user,
            self.pgsql_password,
            self.pgsql_host,
            self.pgsql_port,
            self.pgsql_database
        )

    class Config:
        env_file = "dotenv"


config = Settings()
engine = create_engine(url=config.pgsql_dsn, echo=config.debug)
