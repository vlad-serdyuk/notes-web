import { gql } from '@apollo/client';
import { NOTE_FRAGMENT, NOTE_AUTHOR_FRAGMENT, NOTE_FAVORITED_BY_FRAGMENT } from '/gql/fragments';

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
      id
      createdAt
      content
      private
      favoriteCount
      ...NoteFavoritedBy
      ...NoteAuthor
    }
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
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
        private
        favoriteCount
        ...NoteFavoritedBy
        ...NoteAuthor
      }
    }
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const GET_TRENDS_NOTES = gql`
  query trendsNotes {
    trendsNotes {
      id
      createdAt
      content
      favoriteCount
      ...NoteFavoritedBy
      ...NoteAuthor
    }
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const GET_USER_FAVORITES = gql`
  query UserFavorites($username: String!) {
    user(username: $username) {
      id
      favorites {
        id
        content
        private
        createdAt
        favoriteCount
        ...NoteFavoritedBy
        ...NoteAuthor
      }
    }
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const GET_USER_NOTES = gql`
  query UserNotes($username: String!) {
    user(username: $username) {
      id
      username
      email
      createdAt
      notes {
        id
        content
        private
        createdAt
        favoriteCount
        ...NoteFavoritedBy
        ...NoteAuthor
      }
      favorites {
        id
        content
        createdAt
        private
        favoriteCount
        favoritedBy {
          id
        }
        ...NoteAuthor
      }
    }
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const LOG_OUT = gql`
  query SignOut {
    signOut 
  }
`;