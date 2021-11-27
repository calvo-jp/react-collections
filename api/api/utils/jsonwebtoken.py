"""App JWT helper"""

from datetime import datetime, timedelta
from typing import Any
from uuid import uuid4

from jose import jwt
from jose.constants import ALGORITHMS
from jose.exceptions import JWTError
from redis import Redis

from ..config import config

_blacklist = Redis(config.redis_host, config.redis_port, 99)

_key = config.access_token_secretkey
_alg = [ALGORITHMS.HS256]


def sign(claims: dict[str, Any]):
    payload = claims.copy()

    payload['_id'] = uuid4().hex
    payload['exp'] = (datetime.now() + timedelta(days=14)).timestamp()

    return jwt.encode(payload, _key, _alg[0])


def _blacklisted(token_id: str):
    return _blacklist.get(token_id) is not None


def decode(token: str) -> dict[str, Any]:
    claims = jwt.decode(token, _key, _alg)

    if _blacklisted(claims['_id']):
        raise JWTError()

    return dict(claims)


def invalidate(token: str):
    """Blacklists a token until it expires"""

    claims = decode(token)
    duration = datetime.now() - datetime.fromtimestamp(claims['exp'])

    _blacklist.setex(claims['_id'], duration, "")
