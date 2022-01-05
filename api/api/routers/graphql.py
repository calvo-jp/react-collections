from typing import Union

import strawberry
from strawberry.fastapi import GraphQLRouter

from ..schema import Household, Purok
from ..services import household, purok


@strawberry.type
class Query:
    puroks: list[Purok] = strawberry.field(resolver=purok.fetchall)
    households: list[Household] = strawberry.field(resolver=household.fetchall)

    @strawberry.field
    def purok(self, id_: int) -> Union[Purok, None]:
        return purok.fetchone(id_)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_purok(self, name: str) -> Purok:
        return purok.create(name)


schema = strawberry.Schema(query=Query, mutation=Mutation)
router = GraphQLRouter(schema=schema, path='/graphql')
