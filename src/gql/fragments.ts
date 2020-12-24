import { gql } from '@apollo/client';

const NOTE_AUTHOR_FRAGMENT = gql`
  fragment NoteAuthor on Note {
    author {
      id
      username
      avatar
    }
  }
`;

const NOTE_FAVORITED_BY_FRAGMENT = gql`
  fragment NoteFavoritedBy on Note {
    favoritedBy {
      id
      username
    }
  }
`;

const NOTE_COMMENTS_FRAGMENT = gql`
  fragment NoteComments on Note {
    comments {
      id
      noteId
      content
      createdAt
      author {
        id
        username
        avatar
      }
    }
  }
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const NOTE_FRAGMENT = gql`
  fragment NoteEntity on Note {
    id
    createdAt
    content
    private
    favoriteCount
    ...NoteFavoritedBy
    ...NoteAuthor
    ...NoteComments
  }
  ${NOTE_FAVORITED_BY_FRAGMENT}
  ${NOTE_AUTHOR_FRAGMENT}
  ${NOTE_COMMENTS_FRAGMENT}
`;

