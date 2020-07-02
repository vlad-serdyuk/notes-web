import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'; 

import { Pages } from './pages';
import { GET_ME, GET_APP_METADATA } from '/gql/query';
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
  loading: true,
  isLoggedIn: false,
};

client.query({ query: GET_ME }).then(({ data: userData }) => { 
  if (userData.me) {
    cache.writeData({ 
      data: {
        isLoggedIn: true,
       },
    });
  }
}).finally(() => {
  const prevData = cache.readQuery({ query: GET_APP_METADATA });

  cache.writeData({ 
    data: {
      ...prevData,
      loading: false,
     },
  });
});

cache.writeData({ data });
client.onResetStore(() => cache.writeData({ data }));

const App = () => (
  <ApolloProvider client={client}>
    <Grommet plain>
      <GlobalStyles />
      <Pages />
    </Grommet>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
