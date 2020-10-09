import { gql } from '@apollo/client';

export const NOTE_AUTHOR_FRAGMENT = gql`
  fragment NoteAuthor on Note {
    id
    username
    avatar
  }
`,