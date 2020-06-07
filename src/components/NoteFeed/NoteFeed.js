import React, { Fragment } from 'react';

import { Note } from '../Note';

const NoteFeed = ({ notes }) => {
  return (
    <Fragment>
      {
        notes.map(note => <Note key={note.id} note={note} />)
      }
    </Fragment>
  );
};

export default NoteFeed;