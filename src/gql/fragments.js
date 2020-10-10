import { gql } from '@apollo/client';

export const NOTE_AUTHOR_FRAGMENT = gql`
  fragment NoteAuthor on User {
    id
    username
    avatar
  }
`;