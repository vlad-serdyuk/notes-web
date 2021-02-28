import { DocumentNode } from 'graphql';
import * as Mutations from 'gql/mutation';
import { MUTATION_QUEUE } from 'app/constants/global';
import { camelToSnakeCase } from 'app/utils/stringConvertion';
import { getItem, setItem, removeItem } from 'common/services/ClientStorage';
import GQLService from 'common/services/GQLService';

export async function traverseMutationQueue() {
  const rawMutationQueue = await getItem(MUTATION_QUEUE);

  if (!rawMutationQueue) {
    return;
  }
  
  const client = GQLService.getInitialClient();
  const mutationQueue = JSON.parse(rawMutationQueue as string);
  
  mutationQueue.forEach(async (key: string) => {
    const mutationDTOString = await getItem(key);
    const { name, vars } = JSON.parse(mutationDTOString as string);
    
    const mutationName = camelToSnakeCase(name as string).toUpperCase();
    const mutation: DocumentNode = Mutations[mutationName];

    await client.mutate({ mutation, variables: vars });

    await removeItem(key);
  });

  await initMutationQueueStorage();
};

export async function initMutationQueueStorage() {
  setItem(MUTATION_QUEUE, JSON.stringify([]));
}
