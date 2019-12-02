const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): AuthPayload
  }

  type AuthPayload {
    token: String
  }

  type User {
    email: String
    password: String
    role: Role!
  }

  enum Role {
    ADMIN
    INSTRUCTOR
  }
`