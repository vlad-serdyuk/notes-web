import React, { Fragment } from 'react';
import { Box, Text } from 'grommet';

import { Note } from '../Note';
import { SearchBar } from '/components/SearchBar';

export const NoteFeed = ({ notes }) => {
  return (
    <Fragment>
      <SearchBar />
      {
        !!notes.length
        ? notes.map(note => <Note key={note.id} note={note} />)
        : <Box flex align="center" pad="medium">
            <Text>You don't have notes yet</Text>
          </Box>

      }
    </Fragment>
  );
};