import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const SHOW_NOTIFIFCATION = gql`
  {
    notificationBar @client {
      show
      text
    }
  }
`;

export const GET_APP_METADATA = gql`
  {
    isLoggedIn @client
    loading @client
  }
`;
