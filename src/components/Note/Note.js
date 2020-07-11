import React, { memo, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, Box } from 'grommet';

import { ButtonContainer, IconButton, EditIcon, FavoriteIcon, DeleteIcon } from './Note.styled';

const NoteComponent = ({ note, history }) => {
  const onNoteClick = useCallback(() => {
    history.push(`/note/${note.id}`);
  }, [note, history]);

  const onNoteEditClick = useCallback((e) => {
    e.stopPropagation();
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
        <ButtonContainer direction="row-responsive" gap="large">
          <IconButton plain icon={<FavoriteIcon />} onClick={onNoteEditClick} />
          <IconButton plain icon={<EditIcon />} onClick={onNoteEditClick} />
          <IconButton plain icon={<DeleteIcon />} onClick={onNoteEditClick} />
        </ButtonContainer>
      </Box>
    </Box>
  );
};

export const Note = memo(withRouter(NoteComponent));