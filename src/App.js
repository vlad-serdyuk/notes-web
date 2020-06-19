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

const GetMeQuery = gql`
  query Me {
    me {
      id
      email
    }
  }
`;

client.query({ query: GetMeQuery }).then(({ data: userData }) => { 
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
