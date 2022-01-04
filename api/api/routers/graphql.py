import strawberry
from strawberry.fastapi import GraphQLRouter

from ..schema import Purok
from ..services import purok


@strawberry.type
class Query:
    puroks: list[Purok] = strawberry.field(resolver=purok.fetchall)


@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_purok(self, name: str) -> Purok:
        return purok.create(name)


schema = strawberry.Schema(query=Query, mutation=Mutation)
router = GraphQLRouter(schema=schema, path='/graphql')
