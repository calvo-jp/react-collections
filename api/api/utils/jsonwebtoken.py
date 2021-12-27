"""JWT helper"""

from datetime import datetime, timedelta
from typing import Any
from uuid import uuid4

from jose import jwt
from jose.constants import ALGORITHMS
from jose.exceptions import JWTError
from redis import Redis

from ..config import config

blacklist = Redis(
    host=config.redis_host,
    port=config.redis_port,
    db=0,
    decode_responses=True
)


def blacklisted(token_id: str):
    return blacklist.get(token_id) is not None


def sign(payload: dict[str, Any]):
    claims = payload.copy()

    claims['_id'] = uuid4().hex
    claims['exp'] = (datetime.now() + timedelta(days=14)).timestamp()

    return jwt.encode(claims, config.access_token_secret)


def decode(token: str) -> dict[str, Any]:
    claims = jwt.decode(token, config.access_token_secret, [ALGORITHMS.HS256])
    claims_id = claims.get('_id')
    claims_exp = claims.get('exp')

    if (
        not isinstance(claims_exp, float) or
        not isinstance(claims_id, str) or
        blacklisted(claims_id)
    ):
        raise JWTError()

    return dict(claims)


def invalidate(token: str):
    """blacklists a token until it expires"""

    claims = decode(token)

    blacklist_duration = datetime.fromtimestamp(claims['exp']) - datetime.now()
    blacklist.setex(claims['_id'], blacklist_duration, "")
