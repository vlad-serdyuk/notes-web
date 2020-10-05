import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const SHOW_NOTIFIFCATION = gql`
  {
    isNotificationShown @client
  }
`;

export const GET_APP_METADATA = gql`
  {
    isLoggedIn @client
    loading @client
  }
`;
