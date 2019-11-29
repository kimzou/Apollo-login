const { gql } = require('apollo-server-express');

module.exports = gql`
  type Query {
    login(email: String!, password: String!): User
  }

  type User {
    email: String!
    password: String!
    role: Role!
  }

  enum Role {
    ADMIN
    INSTRUCTOR
  }
`