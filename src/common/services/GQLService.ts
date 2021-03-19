import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
  NormalizedCacheObject,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { GET_ME } from 'gql/query';
import { GET_APP_METADATA } from 'gql/local-query';

const apiUri = process.env.API_URI;
const websocketUri = process.env.WEBSOCKET_URI;

const httpLink = createHttpLink({ uri: apiUri, credentials: 'include' });
const wsLink = new WebSocketLink({
  uri: websocketUri,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

interface InitialStateTypes {
  loading: boolean;
  isLoggedIn: boolean,
}

class GQLService {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.cache = new InMemoryCache();
    this.client = new ApolloClient({
      uri: apiUri,
      cache: this.cache,
      resolvers: {},
      link,
      connectToDevTools: true,
    });
  }

  getInitialClient() {
    return this.client;
  }

  bootstrap() {
    const data: InitialStateTypes = {
      loading: true,
      isLoggedIn: false,
    };

    this.cache.writeQuery({ 
      query: GET_APP_METADATA,
      data,
    });
    this.client.onResetStore(async () => this.cache.writeQuery({ query: GET_APP_METADATA, data: { ...data, loading: false } }));

    this.client.query({ query: GET_ME })
      .then(({ data: userData }) => {
        if (userData.me) {
          this.cache.writeQuery({
            query: GET_APP_METADATA,
            data: {
              isLoggedIn: true,
            },
          });
        }
      }).finally(() => {
        const prevData = this.cache.readQuery<InitialStateTypes>({ query: GET_APP_METADATA });

        this.cache.writeQuery({ 
          query: GET_APP_METADATA,
          data: {
            ...prevData,
            loading: false,
           },
        });
      })
  }
}

export default new GQLService();
