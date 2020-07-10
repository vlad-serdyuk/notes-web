import React, { memo, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, Box, Button } from 'grommet';
import { Edit, Favorite } from 'grommet-icons';

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
        <Box direction="row-responsive" gap="medium">
          <Button plain icon={<Favorite />} onClick={onNoteClick} />
          <Button plain icon={<Edit />} onClick={onNoteClick} />
        </Box>
      </Box>
    </Box>
  );
};

export const Note = memo(withRouter(NoteComponent));