import React, { Fragment } from 'react';

import { Header } from './Header';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div>
        <Navigation />
        <main>{children}</main>
      </div>
    </Fragment>
  );
};