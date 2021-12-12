from calendar import monthrange
from datetime import date, datetime, timezone
from typing import Optional, TypedDict, Union


def _ensure_datetime(subject: Union[datetime, date, None] = None):
    if isinstance(subject, datetime):
        return subject.astimezone(timezone.utc)
    if isinstance(subject, date):
        return datetime(subject.year, subject.month, subject.day, tzinfo=timezone.utc)
    return datetime.now(timezone.utc)


class DateDifference(TypedDict):
    years: int
    months: int
    days: int
    hours: int
    minutes: int
    seconds: int
    milliseconds: float
    future: bool


def date_difference(
    date_left: Union[datetime, date],
    date_right: Optional[Union[datetime, date]] = None
) -> DateDifference:
    _d1 = _ensure_datetime(date_left)
    _d2 = _ensure_datetime(date_right)

    date1 = _d1 if _d1 >= _d2 else _d2
    date2 = _d2 if _d1 >= _d2 else _d1

    years = date1.year - date2.year
    months = date1.month - date2.month
    days = date1.day - date2.day
    hours = date1.hour - date2.hour
    minutes = date1.minute - date2.minute
    seconds = date1.second - date2.second
    microseconds = date1.microsecond - date2.microsecond

    if microseconds < 0:
        seconds = seconds - 1
        microseconds = 1000000 + microseconds
    if seconds < 0:
        minutes = minutes - 1
        seconds = 60 + seconds
    if minutes < 0:
        hours = hours - 1
        minutes = 60 + minutes
    if hours < 0:
        days = days - 1
        hours = 24 + hours
    if days < 0:
        now = datetime.utcnow()
        totaldays = monthrange(now.year, now.month)[1]
        months = months - 1
        days = totaldays + days
    if months < 0:
        years = years - 1
        months = 12 + months

    return {
        'years': years,
        'months': months,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
        'milliseconds': round(microseconds * 0.001, 2),
        'future': _d1 >= _d2
    }
