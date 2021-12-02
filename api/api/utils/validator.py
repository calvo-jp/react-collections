from typing import Any


def validate_url(subject: Any):
    # TODO: validate url with respect to RFC
    return isinstance(subject, str)
