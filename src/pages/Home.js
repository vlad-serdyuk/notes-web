import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div>
      <h1>Notes</h1>
      <p>Home page</p>
      <ul>
        <li><Link to="/my-notes">My Notes</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
      </ul>
    </div>
  );
};