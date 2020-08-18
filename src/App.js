import React from 'react';
import ReactDOM from 'react-dom';
import { Grommet } from 'grommet';
import { ApolloProvider } from '@apollo/client'; 

import GQLService from '/services/GQLService';
import { theme } from './utils/theme';
import { Pages } from './pages';
import GlobalStyles from './styled/globalStyles';

const client = GQLService.getInitialClient();
GQLService.bootstrap();

const App = () => (
  <ApolloProvider client={client}>
    <Grommet theme={theme}>
      <GlobalStyles />
      <Pages />
    </Grommet>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
