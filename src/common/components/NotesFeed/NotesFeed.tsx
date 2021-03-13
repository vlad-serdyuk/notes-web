import React, { Fragment, FC, useRef } from 'react';
import { Box, Text } from 'grommet';

import { Note as NoteModel } from 'gql/models';
import { useWhenVisible } from 'common/hooks/useWhenVisible';
import { FeedNote } from './FeedNote';

interface NotesFeedProps {
  notes: Array<NoteModel>;
}

export const NotesFeed: FC<NotesFeedProps> = ({ notes, children }) => {
  const lastEl = useRef();

  useWhenVisible(lastEl.current, () => {
    // setOffset(offset + limit);
  });

  return (
    <Fragment>
      {children}
      {
        notes.length
        ? notes.map((note, idx) => (
            <FeedNote 
              key={note.id}
              note={note}
              innerRef={idx === notes.length - 1 ? lastEl : undefined}
            />
            )
          )
        : <Box flex align="center" pad="medium">
            <Text>You don't have notes yet</Text>
          </Box>
      }
    </Fragment>
  );
};