import React, { FC, Fragment } from 'react';
import { NotificationBar } from 'common/components/NotificationBar';
import { Pages } from '../pages';

export const AppContainer: FC = () => (
  <Fragment>
    <Pages />

    {/* dialogs */}
    <NotificationBar />
  </Fragment>
);