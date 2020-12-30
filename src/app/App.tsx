import React from 'react';
import { ApolloProvider } from '@apollo/client'; 

import { AppContainer } from 'components/AppContainer';
import { ThemeProvider } from 'app/components/ThemeProvider';
import GlobalStyles from 'app/styled/globalStyles';
import { GlobalContextProvider } from 'common/contexts/globalContext';
import GQLService from 'common/services/GQLService';

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
