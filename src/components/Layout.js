import React, { Fragment } from 'react';
import { Main } from 'grommet';

import { Header } from './Header';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Main>
        <Navigation />
        <main>{children}</main>
      </Main>
    </Fragment>
  );
};