import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { 
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'; 
import { setContext } from 'apollo-link-context';

import { Pages } from './pages';
import GlobalStyles from './styled/globalStyles';
import { getToken } from './services/SessionService';

const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri });

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    authorization: getToken() || '',
  }
}));

const client = new ApolloClient({
  uri,
  cache,
  resolvers: {},
  link: authLink.concat(httpLink),
  connectToDevTools: true,
});

const data = {
  isLoggedIn: !!getToken(),
};

cache.writeData({ data });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Grommet plain>
        <GlobalStyles />
        <Pages />
      </Grommet>
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
