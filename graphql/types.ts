import { gql } from "apollo-server-micro";

// query users and user
export const typeDefs = gql`
  type User {
    _id: ID
    email: String
    password: String
  }

  input UserInput {
      email: String
    password: String
  }

  type Query {
    users: [User]
    user(email: String!): User
    login(email: String!, password: String!): User
  }

  type Mutation {
    createUser(user: UserInput): User
  }
`;
