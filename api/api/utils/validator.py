from typing import Any


def validate_url(subject: Any):
    return isinstance(subject, str)
