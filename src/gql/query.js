import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const CREATE_NOTE = gql`
  mutation createNote($content: String!) {
    createNote(content: $content) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`;

export const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

export const GET_NOTES = gql`
  query NoteFeed($cursor: String) {
    notesFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

export const GET_MY_NOTES = gql`
  query MyNotes {
    notes {
      id
      createdAt
      content
      author {
        id
        username
        avatar
      }
    }
  }
`;

export const LOG_OUT = gql`
  query SignOut {
    signOut 
  }
`;