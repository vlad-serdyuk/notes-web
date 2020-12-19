import React, { Fragment, FC } from 'react';
import { Box, Text } from 'grommet';

import { Note as NoteModel } from 'gql/models';
import { Note } from '../Note';

interface NoteFeedProps {
  notes: Array<NoteModel>;
}

export const NoteFeed: FC<NoteFeedProps> = ({ notes, children }) => {
  return (
    <Fragment>
      {children}
      {
        notes.length
        ? notes.map(note => <Note key={note.id} note={note} />)
        : <Box flex align="center" pad="medium">
            <Text>You don't have notes yet</Text>
          </Box>

      }
    </Fragment>
  );
};