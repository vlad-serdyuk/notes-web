import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Grommet } from 'grommet';
import { ApolloProvider } from '@apollo/client'; 

import GQLService from '/services/GQLService';
import { theme } from './utils/theme';
import { AppContainer } from '/components/AppContainer';
import GlobalStyles from './styled/globalStyles';

const client = GQLService.getInitialClient();
GQLService.bootstrap();

const App = () => (
  <ApolloProvider client={client}>
    <Grommet theme={theme}>
      <GlobalStyles />
      <AppContainer />
    </Grommet>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
