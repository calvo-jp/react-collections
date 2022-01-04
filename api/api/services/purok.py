from sqlmodel import Session, select

from .. import config, models, schema


def fetchall():
    with Session(config.engine) as session:
        stmt = select(models.Purok)
        rows = session.exec(stmt).all()

        return [schema.Purok(**row.dict()) for row in rows]


def create(name: str):
    with Session(config.engine) as session:
        purok = models.Purok(name=name)

        session.add(purok)
        session.commit()
        session.refresh(purok)

        return schema.Purok(**purok.dict())
