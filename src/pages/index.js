import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HomePage } from './Home';
import { MyNotesPage } from './MyNotes';
import { FavoritesPage } from './Favorites';
import { NotePage } from './Note';
import { SignUp } from './SignUp';
import { SignIn } from './SignIn';
import { Layout } from '../components/Layout';
import { PrivateRoute } from '../common/components/PrivateRoute';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={HomePage} />
        <PrivateRoute exact path="/my-notes" component={MyNotesPage} />
        <PrivateRoute exact path="/favorites" component={FavoritesPage} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        
        <Route exact path="/note/:id" component={NotePage} />
      </Layout>
    </Router>
  );
};