import re
from typing import Any


def validate_url(subject: Any):
    # ref: http://urlregex.com/
    pattern = r"http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+"
    pattern = re.compile(pattern, re.I | re.M)

    return isinstance(subject, str) and pattern.match(subject) is not None
