import React, { memo } from 'react'
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Avatar, Box } from 'grommet';

const NoteComponent = ({ note }) => {
  return (
    <Box align="center" direction="row-responsive" pad="small">
      <Avatar size="large" src={note.author.avatar} />
      <Box>
        {note.author.username}
        {format(note.createdAt, 'MMM do YYYY')}
        {note.favoriteCount}
        {' '}
        <ReactMarkdown source={note.content} />
      </Box>
    </Box>
  );
};

export const Note = memo(NoteComponent);