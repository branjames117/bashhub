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
  }
`;

// export the typeDefs
module.exports = typeDefs;
