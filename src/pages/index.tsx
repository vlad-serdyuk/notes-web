import React, { FC, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'components/Layout';
import { Skeleton } from 'common/components/Skeleton';
import { PrivateRoute } from 'common/components/PrivateRoute';
import { HomePage } from './Home';
import { NotesPage } from './Notes';
import { TrendsPage } from './Trends';
import { FavoritesPage } from './Favorites';
import { NotePage } from './Note';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { CreateNotePage } from './CreateNote';
import { EditNotePage } from './EditNote';
import { CreateCommentPage } from './CreateComment';

const ProfilePage = lazy(() => import('./Profile'));
const SettingsPage = lazy(() => import('./Settings'));

export const Pages: FC = () => (
  <Router>
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/trends" component={TrendsPage} />

        <Route exact path="/note/:id" component={NotePage} />
        
        <PrivateRoute exact path="/notes/:author" component={NotesPage} />
        <PrivateRoute exact path="/favorites" component={FavoritesPage} />
        <PrivateRoute exact path="/new" component={CreateNotePage} />
        <PrivateRoute exact path="/edit/:id" component={EditNotePage} />

        <PrivateRoute exact path="/comment/new" component={CreateCommentPage} />

        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/settings" component={SettingsPage} />

        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Suspense>
    </Layout>
  </Router>
);