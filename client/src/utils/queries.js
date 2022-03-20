import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      bio
      avatar
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
