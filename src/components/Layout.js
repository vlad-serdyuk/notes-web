import React, { Fragment } from 'react';
import { Main } from 'grommet';

import { Header } from './Header';

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Main pad="small">
        {children}
      </Main>
    </Fragment>
  );
};