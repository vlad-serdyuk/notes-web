import React, { memo, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Avatar, Box } from 'grommet';

import { GET_NOTES, GET_MY_NOTES } from '/gql/query';
import { DELETE_NOTE } from '/gql/mutation';
import { ConfirmDialog } from './components/ConfirmDialog';
import * as Styled from './Note.styled';

const NoteComponent = ({ note, history }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDialogClose = (e) => {
    e.stopPropagation();
    setDialogOpen(false);
  }

  const onNoteClick = useCallback(() => {    
    history.push(`/note/${note.id}`);
  }, [note, history]);

  const onNoteEditClick = useCallback((e) => {
    e.stopPropagation();
    history.push(`/edit/${note.id}`);
  }, [note, history]);

  const onNoteDeleteClick = useCallback((e) => {
    e.stopPropagation();
    setDialogOpen(true);
  }, [setDialogOpen]);

  const [deleteNote, { loading, error }] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
  });

  const onDeleteNote = useCallback((e) => {
    e.stopPropagation();
    deleteNote({ variables: { id: note.id } });
  }, [deleteNote, note]);

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
          <Styled.IconButton plain icon={<Styled.DeleteIcon />} onClick={onNoteDeleteClick} />
        </Styled.ButtonContainer>
      </Box>
      {isDialogOpen
        && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={onDialogClose} />}
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));