import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_SPLITS = gql`
  mutation addSplits($heatIndex: Number!, $entrantIndex: Number!, $splitsArray: splitInput!) {
    addSplits(heatIndex: $heatIndex, entrantIndex: $entrantIndex, splitsArray: $splitsArray) {
      splits {
        dateTime
        elapsedTime
        split
      }
    }
  }
`;