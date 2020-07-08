import React, { memo, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, Box } from 'grommet';

const NoteComponent = ({ note, history }) => {
  const onNoteClick = useCallback(() => {
    history.push(`/edit/${note.id}`);
  }, [note, history]);

  return (
    <Box
      align="center"
      direction="row-responsive"
      gap="small"
      pad="small"
      border
      onClick={onNoteClick}
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

export const Note = memo(withRouter(NoteComponent));