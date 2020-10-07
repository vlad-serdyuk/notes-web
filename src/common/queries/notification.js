import { useApolloClient } from '@apollo/client';
import { SHOW_NOTIFIFCATION } from '/gql/local-query';

const client = useApolloClient();

const setNotificationQuery = (show, text) => client.writeQuery({
  query: SHOW_NOTIFIFCATION,
  data: {
    text,
    show,
  },
});

export const showNotification = (text) => setNotificationQuery(true, text);
export const hideNotification = () => setNotificationQuery(false, '');

