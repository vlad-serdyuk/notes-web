import React, { memo, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Avatar, Box } from 'grommet';

import { GET_NOTES, GET_MY_NOTES } from '/gql/query';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from '/gql/mutation';
import { ConfirmDialog } from './components/ConfirmDialog';
import * as Styled from './Note.styled';

const NoteComponent = ({ note, history }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);

  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
  });

  const onDialogClose = (e) => {
    e.stopPropagation();
    setDialogOpen(false);
  }

  const onNoteClick = useCallback(() => {    
    history.push(`/note/${note.id}`);
  }, [note, history]);

  const toggleFavorite = useCallback((e) => {
    e.stopPropagation();
    toggleFavoriteMutation({ variables: { id: note.id } });
  }, [toggleFavoriteMutation, note]);

  const editNote = useCallback((e) => {
    e.stopPropagation();
    history.push(`/edit/${note.id}`);
  }, [note, history]);

  const deleteNote = useCallback((e) => {
    e.stopPropagation();
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onDeleteNote = useCallback((e) => {
    e.stopPropagation();
    deleteNoteMutation({ variables: { id: note.id } });
  }, [deleteNoteMutation, note]);

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
          <Styled.IconButton plain icon={<Styled.FavoriteIcon />} onClick={toggleFavorite} />
          <Styled.IconButton plain icon={<Styled.EditIcon />} onClick={editNote} />
          <Styled.IconButton plain icon={<Styled.DeleteIcon />} onClick={deleteNote} />
        </Styled.ButtonContainer>
      </Box>
      {isDialogOpen
        && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={onDialogClose} />}
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));