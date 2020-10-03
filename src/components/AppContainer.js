import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Pages } from '/Pages';
import { Layout } from '/components/Layout';
import { NotificationBar } from '/common/components/NotificationBar';

export const AppContainer = () => (
  <Fragment>
    <Pages />

    {/* dialogs */}
    <NotificationBar />
  </Fragment>
);