import { gql } from '@apollo/client';

export const NOTE_FRAGMENT = gql`
  fragment NoteEntity on Note {
    id
    createdAt
    content
    private
    favoriteCount
    ...NoteFavoritedBy
    ...NoteAuthor
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const NOTE_AUTHOR_FRAGMENT = gql`
  fragment NoteAuthor on Note {
    author {
      id
      username
      avatar
    }
  }
`;

export const NOTE_FAVORITED_BY_FRAGMENT = gql`
  fragment NoteFavoritedBy on Note {
    favoritedBy {
      id
      username
    }
  }
`;