import { gql } from '@apollo/client';
import { NOTE_FRAGMENT, COMMENT_ENTITY } from './fragments';

export const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

export const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($username: String!) {
    updateUser(username: $username) {
      id
      username
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($oldPassword: String!, $newPassword: String!) {
    resetPassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const CREATE_NOTE = gql`
  mutation createNote($content: String!, $private: Boolean!) {
    createNote(content: $content, private: $private) {
      ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!, $private: Boolean!) {
    updateNote(id: $id, content: $content, private: $private) {
      ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

export const TOGGLE_FAVORITE_NOTE = gql`
  mutation toggleFavoriteNote($id: ID!) {
    toggleFavorite(id: $id) {
      ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;

export const TOGGLE_PRIVACY_NOTE = gql`
  mutation togglePrivacyNote($id: ID!, $private: Boolean!) {
    togglePrivacy(id: $id, private: $private) {
      ...NoteEntity
    }
  }
  ${NOTE_FRAGMENT}
`;

export const ADD_COMMENT = gql`
  mutation addComment($content: String!, $noteId: String!) {
    addComment(content: $content, noteId: $noteId) {
      ...CommentEntity
    }
  }
  ${COMMENT_ENTITY}
`;

export const DELETE_COMMENT = gql`
  mutation deleteomment($id: String!) {
    deleteComment(id: $id) 
  }
`;

export const TOGGLE_FAVORITE_COMMENT = gql`
  mutation toggleFavoriteComment($id: ID!) {
    toggleFavoriteComment(id: $id) {
      ...CommentEntity
    }
  }
  ${COMMENT_ENTITY}
`;