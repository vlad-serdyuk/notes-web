import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './Home';
import { MyNotes } from './MyNotes';
import { Favorites } from './Favorites';
import { Layout } from '../components/Layout';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route exact path="/my-notes" component={MyNotes} />
        <Route exact path="/favorites" component={Favorites} />
      </Layout>
    </Router>
  );
};