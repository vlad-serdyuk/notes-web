import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HomePage } from './Home';
import { NotesPage } from './Notes';
import { TrendsPage } from './Trends';
import { FavoritesPage } from './Favorites';
import { NotePage } from './Note';
import { SignUp } from './SignUp';
import { ProfilePage } from './Profile';
import { SettingsPage } from './Settings';
import { SignIn } from './SignIn';
import { CreateNotePage } from './CreateNote';
import { EditNotePage } from './EditNote';
import { Layout } from '/components/Layout';
import { PrivateRoute } from '/common/components/PrivateRoute';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/trends" component={TrendsPage} />
        <PrivateRoute exact path="/notes/:author" component={NotesPage} />
        <PrivateRoute exact path="/favorites" component={FavoritesPage} />
        <PrivateRoute exact path="/new" component={CreateNotePage} />
        <PrivateRoute exact path="/edit/:id" component={EditNotePage} />

        <Route exact path="/note/:id" component={NotePage} />

        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/settings" component={SettingsPage} />
        
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
      </Layout>
    </Router>
  );
};