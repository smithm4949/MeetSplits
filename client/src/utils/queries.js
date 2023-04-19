import { gql } from '@apollo/client';

//export our queries here
export const QUERY_USER = gql`
  query user($email: String!) {
    user(username: $email) {
      _id
      email
      name
    }
  }
`;