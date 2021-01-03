import { useQuery } from '@apollo/client';
import { GET_ME } from 'gql/query';
import { IGetMeData } from 'gql/models';
import { IS_LOGGED_IN } from  'gql/local-query';

export const useIsLoggedInQuery = () => useQuery(IS_LOGGED_IN);

export const useGetMeQuery = () => useQuery<IGetMeData>(GET_ME);