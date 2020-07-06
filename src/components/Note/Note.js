import React, { memo } from 'react'
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Avatar, Box } from 'grommet';

const NoteComponent = ({ note }) => {
  return (
    <Box
      align="center"
      direction="row-responsive"
      gap="small"
      pad="small"
      border
    >
      <Avatar size="large" src={note.author.avatar} />
      <Box>
        {note.author.username}
        {' '}
        {format(note.createdAt, 'MMM do YYYY')}
        {' '}
        <ReactMarkdown source={note.content} />
      </Box>
    </Box>
  );
};

export const Note = memo(NoteComponent);