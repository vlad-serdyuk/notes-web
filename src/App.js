import React from 'react';
import { ApolloProvider } from '@apollo/client'; 

import { GlobalContextProvider } from './common/contexts/globalContext';
import { ThemeProvider } from './common/components/ThemeProvider';
import GQLService from './services/GQLService';
import { AppContainer } from './components/AppContainer';
import GlobalStyles from './styled/globalStyles';

const client = GQLService.getInitialClient();
GQLService.bootstrap();

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <GlobalContextProvider>
        <ThemeProvider>
          <GlobalStyles />
          <AppContainer />
        </ThemeProvider>
      </GlobalContextProvider>
    </ApolloProvider>
  )
};
