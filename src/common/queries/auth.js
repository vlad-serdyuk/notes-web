import { useQuery } from '@apollo/client';
import { IS_LOGGED_IN } from  '../../gql/local-query';

export const useIsLoggedInQuery = () => useQuery(IS_LOGGED_IN);