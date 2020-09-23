import { gql } from '@apollo/client';

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

export const CREATE_NOTE = gql`
  mutation createNote($content: String!, $private: Boolean!) {
    createNote(content: $content, private: $private) {
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

export const UPDATE_NOTE = gql`
  mutation updateNote($id: ID!, $content: String!, $private: Boolean!) {
    updateNote(id: $id, content: $content, private: $private) {
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

export const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`;

export const TOGGLE_FAVORITE_NOTE = gql`
  mutation toggleFavoriteNote($id: ID!) {
    toggleFavorite(id: $id) {
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

export const TOGGLE_PRIVACY_NOTE = gql`
  mutation togglePrivacyNote($id: ID!, $private: Boolean!) {
    togglePrivacy(id: $id, private: $private) {
      id
      content
      createdAt
      private
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