import { useMutation, DocumentNode, ExecutionResult } from '@apollo/client';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { MUTATION_QUEUE } from 'app/constants/global';
import { getItem, setItem } from 'common/services/ClientStorage';
import { isNetoworkOnline } from 'app/services/NetworkHeartBeat';


export const useFallbackMutation = (query: DocumentNode, params?: unknown) => {
  const result = useMutation(query, params);

  const [_, { error }] = result;

  if (error && error.networkError && !error.graphQLErrors.length) {
    (async () => {
      // await setItem('12345_query', query.definitions[0].name.value);
      const bb = await getItem('12345_query');
      const nn = await getItem('12345_vars');

      console.log({ bb, nn });
    })();    
  }

  const mutation = result[0];
  const mutationProxy = async(arg: any): Promise<ExecutionResult<ExecutionResultDataDefault>> => {
    if (!isNetoworkOnline()) {
      await setItem('12345_vars', JSON.stringify(arg.variables));
      await setItem('12345_query', query.definitions[0].name.value);
    }

    return mutation(arg);
  }

  return [mutationProxy, result[1]];
};