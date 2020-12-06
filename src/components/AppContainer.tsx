import React, { FC, Fragment } from 'react';
import { Pages } from '../pages';
import { NotificationBar } from '../common/components/NotificationBar';

export const AppContainer: FC = () => (
  <Fragment>
    <Pages />

    {/* dialogs */}
    <NotificationBar />
  </Fragment>
);