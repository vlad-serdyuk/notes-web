import { gql } from '@apollo/client';
import { NOTE_FRAGMENT } from './fragments';

const COMMENTS_SUBSCRIPTION = gql`
  subscription notesFeedUpdated {
    notesFeedUpdated {
        ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;