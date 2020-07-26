import React, { memo, useMemo, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Avatar, Box, Text } from 'grommet';

import { GET_NOTES, GET_ME } from '/gql/query';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from '/gql/mutation';
import { ConfirmDialog } from './components/ConfirmDialog';
import * as Styled from './Note.styled';

const NoteComponent = ({ note, history }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { data: { me } } = useQuery(GET_ME);
  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);

  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const isUserNote = useMemo(() => {
    if (!me) {
      return false;
    }
    
    return me.id === note.author.id;
  }, [note, me]);
  
  const isUserFavorite = useMemo(() => {
    if (!me) {
      return false;
    }

    return (note.favoritedBy || []).find(({ id }) => me.id === id);
  }, [note, me]);

  const onDialogClose = (e) => {
    e.stopPropagation();
    setDialogOpen(false);
  }

  const openAuthorNotes = (e) => {
    e.stopPropagation();
    history.push(`/notes/${note.author.username}`);
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
        <Box direction="row" gap="small" align="end">
          <Styled.AuthorText onClick={openAuthorNotes}>{note.author.username}</Styled.AuthorText>
          <Text size="small" color="grey">{format(note.createdAt, 'MMM do YYYY')}</Text>
        </Box>
        <ReactMarkdown source={note.content} />
        <Styled.ButtonContainer direction="row-responsive" gap="large">
          <Box direction="row" align="center">
            <Styled.IconButton plain icon={<Styled.FavoriteIcon selected={isUserFavorite} />} onClick={toggleFavorite} />
            {(note.favoriteCount > 0) && <Text size="small" color={isUserFavorite ? 'brand' : null}>{note.favoriteCount}</Text>}
          </Box>
          {isUserNote && <Styled.IconButton plain icon={<Styled.EditIcon />} onClick={editNote} />}
          {isUserNote && <Styled.IconButton plain icon={<Styled.DeleteIcon />} onClick={deleteNote} />}
        </Styled.ButtonContainer>
      </Box>
      {isDialogOpen
        && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={onDialogClose} />}
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));