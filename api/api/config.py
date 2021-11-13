# pylint:disable=consider-using-f-sting

from os import getenv

from dotenv import load_dotenv
from sqlmodel import create_engine

load_dotenv()


class MissingConfig(Exception):
    """Exception raise for missing env variables"""


class Config:
    env: str

    pgsql_host: str
    pgsql_port: str
    pgsql_user: str
    pgsql_password: str
    pgsql_database: str

    redis_host: str
    redis_port: str

    access_token_secretkey: str

    def __init__(self):
        keys = """
        ENV

        PGSQL_HOST
        PGSQL_PORT
        PGSQL_USER
        PGSQL_PASSWORD
        PGSQL_DATABASE

        REDIS_HOST
        REDIS_PORT

        ACCESS_TOKEN_SECRETKEY
        """.split()

        for key in keys:
            value = getenv(key)

            if value is None:
                raise MissingConfig(key)

            setattr(self, key.lower(), value)

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
    def development(self):
        return self.env == 'development'


config = Config()
engine = create_engine(config.pgsql_dsn)
