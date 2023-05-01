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
    grade: Int
    team: Team
  }

  type Meet {
    _id: ID
    name: String
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

  type Event {
    _id: ID
    name: String
    legs: [Int]
    team: ID
    meetEvent: ID
    heats: [Heat]
  }

  type Heat {
    heatNumber: Int
    entrants: [Entrant]
  }

  type Entrant {
    athletes: [ID]
    splits: [Split]
  }

  type Split {
    dateTime: String
    elapsedTime: Int
    split: Int 
  }

  input SplitInput {
    dateTime: String
    elapsedTime: Int
    split: Int
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
    athletes(team: String!): [Athlete]
    eventInstance: Event
    events: [Event]
    meets: [Meet]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addSplits(heatIndex: Int!, entrantIndex: Int!, splitsArray: SplitInput!): [Split]
  }

`;

module.exports = typeDefs;
