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

export const COMMENT_ENTITY = gql`
  fragment CommentEntity on Comment {
    id
    noteId
    content
    createdAt
    favoriteCount
    favoritedBy {
      id
      username
    }
    author {
      id
      username
      avatar
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
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        id
        username
        avatar
      }
    }
  }
  ${NOTE_AUTHOR_FRAGMENT}
`;

export const TREND_NOTE_FRAGMENT = gql`
  fragment TrendNoteEntity on Note {
    id
    createdAt
    content
    favoriteCount
    ...NoteAuthor
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
