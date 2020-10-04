import React, { Fragment } from 'react';
import { Pages } from '/Pages';
import { NotificationBar } from '/common/components/NotificationBar';

export const AppContainer = () => (
  <Fragment>
    <Pages />

    {/* dialogs */}
    <NotificationBar />
  </Fragment>
);