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
      createdAt
      tags {
        _id
        name
      }
      description
      hero
      heroId
      videoUrl
      commentsEnabled
      publicEnabled
      eventParent {
        _id
        name
        slug
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($event_slug: String!, $body: String!) {
    addComment(event_slug: $event_slug, body: $body) {
      comments {
        author {
          username
          avatar
        }
        _id
        body
        createdAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($event_slug: String!, $_id: ID!) {
    removeComment(event_slug: $event_slug, _id: $_id) {
      comments {
        author {
          username
          avatar
        }
        _id
        body
        createdAt
      }
    }
  }
`;

export const ADD_ATTENDEE = gql`
  mutation addAttendee($event_id: ID!) {
    addAttendee(event_id: $event_id) {
      user {
        _id
        email
        username
        eventsAttending {
          _id
          name
          slug
        }
      }
      event {
        _id
        slug
        hero
        startDate
        startTime
        endDate
        endTime
        description
        location
        eventType
        createdAt
        attendees {
          _id
          email
          username
        }
      }
    }
  }
`;

export const REMOVE_ATTENDEE = gql`
  mutation removeAttendee($event_id: ID!) {
    removeAttendee(event_id: $event_id) {
      user {
        _id
        email
        username
        eventsAttending {
          _id
          name
          slug
        }
      }
      event {
        _id
        slug
        hero
        startDate
        startTime
        endDate
        endTime
        description
        location
        eventType
        createdAt
        attendees {
          _id
          email
          username
        }
      }
    }
  }
`;
