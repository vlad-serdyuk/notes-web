import { gql, useQuery } from '@apollo/client';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

export const useIsLoggedInQuery = () => useQuery(IS_LOGGED_IN);