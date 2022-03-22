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
    eventsManaged: [Event]
    eventsAttending: [Event]
  }

  type Tag {
    _id: ID
    name: String
  }

  type Event {
    _id: ID
    name: String
    slug: String
    location: String
    eventType: String
    startDate: String
    startTime: String
    createdAt: String
    endDate: String
    endTime: String
    ownerId: ID
    ownerName: String
    attendees: [User]
    url: String
    ticketsUrl: String
    pricing: String
    tags: [Tag]
    description: String
    hero: String
    heroId: String
    videoUrl: String
    commentsEnabled: Boolean
    publicEnabled: Boolean
    eventParent: Event
    subevents: [Event]
  }

  input EventInput {
    name: String!
    slug: String!
    location: String!
    createdAt: String
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
    videoUrl: String
    commentsEnabled: Boolean
    publicEnabled: Boolean
    eventParent: ID
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    event(slug: String!): Event
    slug(slug: String!): Event
    subevents(_id: ID!): [Event]
  }

  type Auth {
    token: ID!
    user: User
  }

  type AttendanceUpdate {
    event: Event
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String!, username: String, password: String!): Auth
    editBio(bio: String): User
    addEvent(eventInput: EventInput): Event
    addAttendee(event_id: ID!): AttendanceUpdate
    removeAttendee(event_id: ID!): AttendanceUpdate
  }
`;

// export the typeDefs
module.exports = typeDefs;
