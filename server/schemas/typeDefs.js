// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    email: String
    username: String
    bio: String
    avatar: String
  }

  type Event {
    _id: ID
    name: String
    slug: String
    location: String
    eventType: String
    startDate: String
    startTime: String
    endDate: String
    endTime: String
    ownerId: ID
    ownerName: String
    url: String
    ticketsUrl: String
    pricing: String
    tags: [String]
    description: String
    hero: String
    heroId: String
    commentsEnabled: Boolean
    publicEnabled: Boolean
  }

  input EventInput {
    name: String!
    slug: String!
    location: String
    eventType: String
    startDate: String
    startTime: String
    endDate: String
    endTime: String
    ownerId: ID
    ownerName: String
    url: String
    ticketsUrl: String
    pricing: String
    tags: [String]
    description: String
    hero: String
    heroId: String
    commentsEnabled: Boolean
    publicEnabled: Boolean
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, username: String, password: String!): Auth
    editBio(bio: String): User
    addEvent(eventInput: EventInput): Event
  }
`;

// export the typeDefs
module.exports = typeDefs;
