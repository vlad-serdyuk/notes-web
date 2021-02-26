import { DocumentNode } from 'graphql';
import * as Mutations from 'gql/mutation';
import { MUTATION_QUEUE } from 'app/constants/global';
import { camelToSnakeCase } from 'app/utils/stringConvertion';
import { getItem, removeItem } from 'common/services/ClientStorage';
import GQLService from 'common/services/GQLService';

export async function traverseMutationQueue() {
  const mutationQueueStr = await getItem(MUTATION_QUEUE);

  //if (mutationQueueStr) {
    // const mutationQueue = JSON.parse(mutationQueueStr as string);
    const bb = await getItem('12345_query');
    const nn = await getItem('12345_vars');

    const mutationName = camelToSnakeCase(bb as string).toUpperCase();

    const mutation: DocumentNode = Mutations[mutationName];
  
    const variables = JSON.parse(nn as string);
  
  
    const client = GQLService.getInitialClient();
    const gg = await client.mutate({ mutation, variables });
    console.log(gg);

    await removeItem('12345_query');
    await removeItem('12345_vars');
  //}
};
