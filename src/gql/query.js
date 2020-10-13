import { gql } from '@apollo/client';
import { NOTE_FRAGMENT } from '/gql/fragments';

export const GET_ME = gql`
  query Me {
    me {
      id
      email
      username
      createdAt
    }
  }
`

export const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    notesFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        ...NoteEntity
      }
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_TRENDS_NOTES = gql`
  query trendsNotes {
    trendsNotes {
      ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_USER_FAVORITES = gql`
  query UserFavorites($username: String!) {
    user(username: $username) {
      id
      favorites {
        ...NoteEntity
      }
    }
  }
  ${NOTE_FRAGMENT}
`;

export const GET_USER_NOTES = gql`
  query UserNotes($username: String!) {
    user(username: $username) {
      id
      username
      email
      createdAt
      notes {
        ...NoteEntity
      }
      favorites {
        ...NoteEntity
      }
    }
  }
  ${NOTE_FRAGMENT}
`;

export const LOG_OUT = gql`
  query SignOut {
    signOut 
  }
`;