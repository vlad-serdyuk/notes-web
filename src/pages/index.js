import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Home } from './Home';
import { MyNotes } from './MyNotes';
import { Favorites } from './Favorites';

export const Pages = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/my-notes" component={MyNotes} />
      <Route exact path="/favorites" component={Favorites} />
    </Router>
  );
};