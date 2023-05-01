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

export const QUERY_EVENTS = gql`
  query getEvents {
    events {
      _id
      name
      meetEvent
    }
  }
`;

export const QUERY_MEETS = gql`
  query getMeets {
    meets {
      _id
      name
    }
  }
`;


export const QUERY_EVENT_INSTANCE = gql`
  query eventInstance($eventId: ID!) {
    eventInstance(eventId: $eventId) {
      _id
      name
      legs
      team
      meetEvent
      heats {
        entrants {
          athletes
          splits {
            dateTime
            elapsedTime
            split
          }
        }
      }
    }
  }
`;