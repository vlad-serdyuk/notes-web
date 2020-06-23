import React, { Fragment } from 'react';
import { Main, Box } from 'grommet';

import { Header } from './Header';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Main pad="small" direction="row">
        <Navigation />
        <Box pad="small">
          {children}
        </Box>
      </Main>
    </Fragment>
  );
};