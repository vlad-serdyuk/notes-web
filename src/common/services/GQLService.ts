import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client';
import { GET_ME } from '../../gql/query';
import { GET_APP_METADATA } from '../../gql/local-query';

const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri, credentials: 'include' });

class GQLService {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.cache = new InMemoryCache();
    this.client = new ApolloClient({
      uri,
      cache: this.cache,
      resolvers: {},
      link: httpLink,
      connectToDevTools: true,
    });
  }

  getInitialClient() {
    return this.client;
  }

  bootstrap() {
    const data = {
      loading: true,
      isLoggedIn: false,
    };

    this.cache.writeData({ data });
    this.client.onResetStore(() => this.cache.writeData({ data: { ...data, loading: false } }));

    this.client.query({ query: GET_ME })
      .then(({ data: userData }) => {
        if (userData.me) {
          this.cache.writeData({ 
            data: {
              isLoggedIn: true,
            },
          });
        }
      }).finally(() => {
        const prevData = this.cache.readQuery({ query: GET_APP_METADATA });

        this.cache.writeData({ 
          data: {
            ...prevData,
            loading: false,
           },
        });
      })
  }
}

export default new GQLService();