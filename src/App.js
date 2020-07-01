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
import { GET_ME } from '/gql/query';
import { Loader } from '/components/Loader';
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
  cache.writeData({ 
    data: {
      ...data,
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
