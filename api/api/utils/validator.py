import re


def validate_url(subject: str):
    # ref: http://urlregex.com/
    pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    pattern = re.compile(pattern, re.I | re.M)

    return pattern.match(subject) is not None
