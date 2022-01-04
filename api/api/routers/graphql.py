import strawberry
from strawberry.fastapi import GraphQLRouter


@strawberry.type
class Query:
    hello: str


@strawberry.type
class Mutation:
    @strawberry.mutation
    def example(self, ) -> str:
        return ""


schema = strawberry.Schema(query=Query, mutation=Mutation)
router = GraphQLRouter(schema=schema, path='/graphql')
