import React, { Fragment, FC } from 'react';
import { Box, Text } from 'grommet';

import { Note as NoteModel } from 'gql/models';
import { FeedNote } from '../FeedNote';

interface NotesFeedProps {
  notes: Array<NoteModel>;
}

export const NotesFeed: FC<NotesFeedProps> = ({ notes, children }) => {
  return (
    <Fragment>
      {children}
      {
        notes.length
        ? notes.map(note => <FeedNote key={note.id} note={note} />)
        : <Box flex align="center" pad="medium">
            <Text>You don't have notes yet</Text>
          </Box>
      }
    </Fragment>
  );
};