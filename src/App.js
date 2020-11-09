import React from 'react';
import { Grommet } from 'grommet';
import { ApolloProvider } from '@apollo/client'; 

import GQLService from './services/GQLService';
import { theme } from './utils/theme';
import { AppContainer } from './components/AppContainer';
import GlobalStyles from './styled/globalStyles';

const client = GQLService.getInitialClient();
GQLService.bootstrap();

export const App = () => (
  <ApolloProvider client={client}>
    <Grommet theme={theme}>
      <GlobalStyles />
      <AppContainer />
    </Grommet>
  </ApolloProvider>
);
