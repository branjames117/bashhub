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
    }
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
