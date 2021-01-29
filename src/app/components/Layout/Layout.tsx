import React, { FC, Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from 'grommet';

import { GET_APP_METADATA } from 'gql/local-query';
import { Skeleton } from 'common/components/Skeleton';
import { Header } from 'app/components/Header';
import { Navigation } from 'app/components/Navigation';
import { TrendsWidget } from 'components/TrendsWidget';
import { MainContainer } from './Layout.styles';

export const Layout: FC = ({ children }) => {
  const { data, loading } = useQuery(GET_APP_METADATA);

  return (
    <Fragment>
      <Header />
      <MainContainer>
        <Navigation />
        <Box pad="small" width="100%">
          {
            (data.loading || loading)
            ? <Skeleton />
            : children
          }
        </Box>
        <Box pad="small" width="420px">
          <TrendsWidget />
        </Box>
      </MainContainer>
    </Fragment>
  );
};