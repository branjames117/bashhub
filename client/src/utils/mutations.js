import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $username: String!, $password: String!) {
    addUser(email: $email, username: $username, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const EDIT_BIO = gql`
  mutation editBio($bio: String!) {
    editBio(bio: $bio) {
      bio
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent($eventInput: EventInput!) {
    addEvent(eventInput: $eventInput) {
      _id
      name
      slug
      location
      eventType
      startDate
      startTime
      endDate
      endTime
      ownerId
      ownerName
      url
      ticketsUrl
      pricing
      tags
      description
      hero
      heroId
      commentsEnabled
      publicEnabled
    }
  }
`;
