from sqlmodel import Session, select

from .. import config, models, schema


def fetchall():
    with Session(config.engine) as session:
        stmt = select(models.Household)
        rows = session.exec(stmt).all()

        return [schema.Household(**row.dict()) for row in rows]


def fetchone(id_: int):
    with Session(config.engine) as session:
        stmt = select(models.Household).where(models.Household.id == id_)
        data = session.exec(stmt).one_or_none()

        if data is None:
            return None

        return schema.Household(**data.dict())
