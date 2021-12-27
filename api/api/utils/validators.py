import re


def is_phone(subject: str):
    pattern = re.compile(r'^(+?63|0)?9\d{9}$')
    return pattern.match(subject) is not None
