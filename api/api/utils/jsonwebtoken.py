# pylint: disable=invalid-name

from datetime import datetime, timedelta
from typing import Any
from uuid import uuid4

from jose import jwt
from jose.constants import ALGORITHMS
from jose.exceptions import JWTError
from redis import Redis

from ..config import config

_blacklist = Redis(host=config.redis_host, port=config.redis_port, db=0)
_secretkey = config.access_token_secret
_algorithm = ALGORITHMS.HS256


def _blacklisted(token_id: str):
    return _blacklist.get(token_id) is not None


def sign(payload: dict[str, Any]):
    claims = payload.copy()

    claims['exp'] = (datetime.now() + timedelta(days=14)).timestamp()
    claims['_id'] = uuid4().hex

    return jwt.encode(claims, _secretkey, _algorithm)


def decode(token: str) -> dict[str, Any]:
    claims = jwt.decode(token, _secretkey, [_algorithm])

    if _blacklisted(claims['_id']):
        raise JWTError()

    return dict(claims)


def invalidate(token: str):
    claims = decode(token)
    duration = datetime.fromtimestamp(claims['exp']) - datetime.now()

    _blacklist.setex(claims['_id'], duration, "")
