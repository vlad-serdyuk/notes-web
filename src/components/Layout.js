import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { Main, Box } from 'grommet';

import { GET_APP_METADATA } from '/gql/query';
import { Header } from './Header';
import { Skeleton } from './Skeleton';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  const { data, loading } = useQuery(GET_APP_METADATA);

  return (
    <Fragment>
      <Header />
      <Main pad="small" direction="row">
        <Navigation />
        <Box pad="small" width="100%">
          {
            (data.loading || loading)
            ? <Skeleton />
            : children
          }
        </Box>
      </Main>
    </Fragment>
  );
};