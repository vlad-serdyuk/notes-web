import React, { memo, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
import { Avatar, Box } from 'grommet';

import * as Styled from './Note.styled';

const NoteComponent = ({ note, history }) => {
  const onNoteClick = useCallback(() => {
    history.push(`/note/${note.id}`);
  }, [note, history]);

  const onNoteEditClick = useCallback((e) => {
    e.stopPropagation();
    history.push(`/edit/${note.id}`);
  }, [note, history]);

  return (
    <Styled.NoteContainer onClick={onNoteClick}>
      <Avatar size="large" src={note.author.avatar} />
      <Box>
        {note.author.username}
        {' '}
        {format(note.createdAt, 'MMM do YYYY')}
        {' '}
        <ReactMarkdown source={note.content} />
        <Styled.ButtonContainer direction="row-responsive" gap="large">
          <Styled.IconButton plain icon={<Styled.FavoriteIcon />} onClick={onNoteEditClick} />
          <Styled.IconButton plain icon={<Styled.EditIcon />} onClick={onNoteEditClick} />
          <Styled.IconButton plain icon={<Styled.DeleteIcon />} onClick={onNoteEditClick} />
        </Styled.ButtonContainer>
      </Box>
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));