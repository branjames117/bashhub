import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      avatar
      eventsManaged {
        _id
        name
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
      }
      eventsAttending {
        _id
        name
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
      }
    }
  }
`;

export const QUERY_NOTIFICATIONS = gql`
  query notifications {
    notifications {
      toId {
        _id
        username
      }
      fromId {
        _id
        username
      }
      subject {
        _id
        slug
        name
      }
      notifType
      read
      createdAt
      _id
    }
  }
`;

export const QUERY_NOTIF_COUNT = gql`
  query notifCount {
    notifCount
  }
`;

export const QUERY_SLUG = gql`
  query slug($slug: String!) {
    slug(slug: $slug) {
      _id
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      bio
      avatar
      eventsManaged {
        _id
        name
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
      }
      eventsAttending {
        _id
        name
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
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_EVENT = gql`
  query event($slug: String!) {
    event(slug: $slug) {
      _id
      name
      slug
      location
      eventType
      description
      hero
      videoUrl
      startDate
      startTime
      endDate
      endTime
      ownerId {
        _id
        username
        avatar
      }
      ownerName
      url
      comments {
        author {
          username
          avatar
        }
        _id
        body
        createdAt
      }
      ticketsUrl
      pricing
      commentsEnabled
      publicEnabled
      createdAt
      attendees {
        _id
        username
        email
        avatar
      }
      subevents {
        _id
        name
        slug
        location
        description
        startDate
        startTime
        endDate
        endTime
      }
      eventParent {
        _id
        name
        slug
        hero
        eventType
      }
      tags {
        _id
        name
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query events {
    events {
      _id
      name
      slug
      location
      eventType
      description
      hero
      videoUrl
      startDate
      startTime
      endDate
      endTime
      ownerId {
        _id
        username
        avatar
      }
      ownerName
      url
      ticketsUrl
      pricing
      commentsEnabled
      publicEnabled
      createdAt
      tags {
        _id
        name
      }
    }
  }
`;

export const QUERY_SUBEVENTS = gql`
  query subevents($_id: ID!) {
    subevents(_id: $_id) {
      _id
      name
      slug
      location
      eventType
      description
      hero
      videoUrl
      startDate
      startTime
      endDate
      endTime
      ownerId
      ownerName
      url
      ticketsUrl
      pricing
      commentsEnabled
      publicEnabled
      createdAt
      eventParent {
        _id
        name
      }
      tags {
        _id
        name
      }
    }
  }
`;
