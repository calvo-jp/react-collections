# pylint: disable=invalid-name

from datetime import datetime, timedelta
from typing import Any
from uuid import uuid4

from jose import jwt
from jose.constants import ALGORITHMS
from jose.exceptions import JWTError
from redis import Redis

from ..config import config

blacklist = Redis(host=config.redis_host, port=config.redis_port, db=0)


def blacklisted(token_id: str):
    return blacklist.get(token_id) is not None


def sign(payload: dict[str, Any]):
    claims = payload.copy()

    claims['_id'] = uuid4().hex
    claims['exp'] = (datetime.now() + timedelta(days=14)).timestamp()

    return jwt.encode(claims, config.access_token_secret, ALGORITHMS.HS256)


def decode(token: str) -> dict[str, Any]:
    claims = jwt.decode(token, config.access_token_secret, [ALGORITHMS.HS256])

    try:
        assert not blacklisted(claims['_id'])
        assert isinstance(claims['exp'], float)
        return dict(claims)
    except (AssertionError, IndexError) as error:
        raise JWTError() from error


def invalidate(token: str):
    """blacklists a token until it expires"""

    claims = decode(token)
    duration = datetime.fromtimestamp(claims['exp']) - datetime.now()

    blacklist.setex(claims['_id'], duration, "")
