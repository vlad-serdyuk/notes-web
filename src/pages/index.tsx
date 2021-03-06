import React, { FC, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout } from 'app/components/Layout';
import { Skeleton } from 'common/components/Skeleton';
import { PrivateRoute } from 'common/components/PrivateRoute';
import { HomePage } from './Home';
import { NotesPage } from './Notes';
import { TrendsPage } from './Trends';
import { FavoritesPage } from './Favorites';
import { NotePage } from './Note';
import { CreateNotePage } from './CreateNote';
import { EditNotePage } from './EditNote';

const SignInPage = lazy(() => import('./SignIn'));
const SignUpPage = lazy(() => import('./SignUp'));

const ProfilePage = lazy(() => import('./Profile'));
const SettingsPage = lazy(() => import('./Settings'));

const AddCommentPage = lazy(() => import('./AddComment'));

export const Pages: FC = () => (
  <Router>
    <Layout>
      <Suspense fallback={<Skeleton />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/notes/trends" component={TrendsPage} />
          
          <PrivateRoute exact path="/user/:usermatch" component={NotesPage} />
          <PrivateRoute exact path="/notes/favorites" component={FavoritesPage} />
          <PrivateRoute exact path="/note/new" component={CreateNotePage} />
          <PrivateRoute exact path="/note/:id/edit" component={EditNotePage} />

          <PrivateRoute exact path="/note/:id/comment/new" component={AddCommentPage} />

          <Route exact path="/note/:id" component={NotePage} />

          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/settings" component={SettingsPage} />

          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
        </Switch>
      </Suspense>
    </Layout>
  </Router>
);