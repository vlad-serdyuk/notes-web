import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const SHOW_NOTIFIFCATION = gql`
  query notificationBar {
    show @client
    text @client
  }
`;

export const SWITCH_THEME = gql`
  query switchTheme {
    theme @client
  }
`;

export const GET_APP_METADATA = gql`
  {
    isLoggedIn @client
    loading @client
  }
`;
