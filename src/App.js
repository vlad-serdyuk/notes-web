import React from 'react';
import { Grommet } from 'grommet';
import { ApolloProvider, useQuery } from '@apollo/client'; 

import GQLService from './services/GQLService';
import { theme } from './styled/theme';
import { AppContainer } from './components/AppContainer';
import GlobalStyles from './styled/globalStyles';
import { SWITCH_THEME } from './gql/local-query';

const client = GQLService.getInitialClient();
GQLService.bootstrap();

export const App = () => {
  const { data = {}, client } = useQuery(SWITCH_THEME);


  return (
    <ApolloProvider client={client}>
      <Grommet theme={theme}>
        <GlobalStyles />
        <AppContainer />
      </Grommet>
    </ApolloProvider>
  )
};
