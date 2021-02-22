import { gql, useMutation, DocumentNode, MutationResult } from '@apollo/client';
import { getItem, setItem } from 'common/services/ClientStorage';

export const useFallbackMutation = (query: DocumentNode, params?: unknown) => {
  const result = useMutation(query, params);

  const [_, { error }] = result;

  if (error && error.networkError && !error.graphQLErrors.length) {
    (async () => {
      await setItem('12345_query', JSON.stringify(query.loc.source.body));
      const bb = await getItem('12345_query');
      const nn = await getItem('12345_vars');

      console.log({ bb, nn });
    })();    
  }

  const g = result[0];
  const h = async(arg: any): MutationResult => {
    await setItem('12345_vars', JSON.stringify(arg.variables));
    return g(arg);
  }

  return [h, result[1]];
};