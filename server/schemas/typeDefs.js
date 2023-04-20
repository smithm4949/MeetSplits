const { gql } = require('apollo-server-express');

// define our types here. Schema for objects that should match mongo schema
// queries and mutations to match our resolvers
const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Athlete {
    _id: ID
    name: String
    grade: Int,
    team: Team
  }

  type Team {
    _id: ID,
    name: String
    abbreviaton: String
    settings: Settings
  }

  type Settings {
    accentColorLight: String
    accentColorDark: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
    athletes(team: String!): [Athlete]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;
