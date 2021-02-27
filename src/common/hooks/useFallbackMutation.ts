import { useMutation, DocumentNode, ExecutionResult } from '@apollo/client';
import { ExecutionResultDataDefault } from 'graphql/execution/execute';
import { MUTATION_QUEUE } from 'app/constants/global';
import { generateId } from 'app/utils/idGenerator';
import { getItem, setItem } from 'common/services/ClientStorage';
import { isNetoworkOnline } from 'app/services/NetworkHeartBeat';


export const useFallbackMutation = (query: DocumentNode, params?: unknown) => {
  const result = useMutation(query, params);

  const [_, { error }] = result;

  if (error && error.networkError && !error.graphQLErrors.length) {
    // TODO: handle suddenly connection lost  
  }

  const mutation = result[0];
  const mutationProxy = async(arg: any): Promise<ExecutionResult<ExecutionResultDataDefault>> => {
    if (!isNetoworkOnline()) {
      const id = generateId();
      // cosnt await getItem(MUTATION_QUEUE);
      await setItem('12345_vars', JSON.stringify(arg.variables));
      await setItem('12345_query', query.definitions[0].name.value);
    }

    return mutation(arg);
  }

  return [mutationProxy, result[1]];
};