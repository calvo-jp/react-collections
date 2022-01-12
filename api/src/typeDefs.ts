import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    user(id: Int!): User
    users: [User]
  }
`;

export default typeDefs;
