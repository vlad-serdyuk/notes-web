import React, { Fragment, FC } from 'react';
import { Box, Text } from 'grommet';

import { Note } from '../Note/index';

export const NoteFeed: FC = ({ notes, children }) => {
  return (
    <Fragment>
      {children}
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