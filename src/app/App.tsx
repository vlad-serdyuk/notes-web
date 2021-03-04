import React from 'react';
import { ApolloProvider } from '@apollo/client'; 

import { AppContainer } from 'app/AppContainer';
import { ThemeProvider } from 'app/components/ThemeProvider';
import GlobalStyles from 'app/styled/globalStyles';
import { initMutationQueueStorage } from 'app/services/MutationQueueHandler';
import { GlobalContextProvider } from 'common/contexts/globalContext';
import GQLService from 'common/services/GQLService';

import 'app/services/NetworkHeartBeat';

const client = GQLService.getInitialClient();
GQLService.bootstrap();

initMutationQueueStorage();

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
