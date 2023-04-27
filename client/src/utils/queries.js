import { gql } from '@apollo/client';

//export our queries here
export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      email
    }
  }
`;