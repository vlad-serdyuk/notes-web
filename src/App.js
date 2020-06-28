import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import {
  gql,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'; 

import { Pages } from './pages';
import { GET_ME } from '/gql/query';
import GlobalStyles from './styled/globalStyles';

const uri = process.env.API_URI;
const cache = new InMemoryCache();
const httpLink = createHttpLink({ uri, credentials: 'include' });

const client = new ApolloClient({
  uri,
  cache,
  resolvers: {},
  link: httpLink,
  connectToDevTools: true,
});

const data = {
  isLoggedIn: false,
};

client.query({ query: GET_ME }).then(({ data: userData }) => { 
  if (userData.me) {
    cache.writeData({ data: { isLoggedIn: true } });
  }
});

cache.writeData({ data });
client.onResetStore(() => cache.writeData({ data }));

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
