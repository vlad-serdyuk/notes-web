import GQLService from 'common/services/GQLService';
import { SHOW_NOTIFIFCATION } from 'gql/local-query';

const client = GQLService.getInitialClient();

export function showNotification(text: string): void {
  client.writeQuery({
    query: SHOW_NOTIFIFCATION,
    data: {
      text,
      show: true,
    },
  });
};

export function closeNotification(): void {
  client.writeQuery({
    query: SHOW_NOTIFIFCATION,
    data: {
      text: '',
      show: false,
    },
  });
};