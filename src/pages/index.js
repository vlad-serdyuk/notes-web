import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { HomePage } from './Home';
import { MyNotesPage } from './MyNotes';
import { FavoritesPage } from './Favorites';
import { NotePage } from './Note';
import { Layout } from '../components/Layout';

export const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/my-notes" component={MyNotesPage} />
        <Route exact path="/favorites" component={FavoritesPage} />
        
        <Route exact path="/note/:id" component={NotePage} />
      </Layout>
    </Router>
  );
};