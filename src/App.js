import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'; 

import { Pages } from './pages';
import GlobalStyles from './styled/globalStyles';

const uri = process.env.API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
});

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
