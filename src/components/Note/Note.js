import React, { memo, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Avatar, Box, Button, Layer, Heading, Text } from 'grommet';

import { GET_NOTES, GET_MY_NOTES } from '/gql/query';
import { DELETE_NOTE } from '/gql/mutation';
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

  const onDeleteNote = useCallback(() => {
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
      {isDialogOpen && (
        <Layer position="center" onClickOutside={onDialogClose} onEsc={onDialogClose}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              Confirm
            </Heading>
            <Text>Are you sure you want to delete?</Text>
            <Box
              as="footer"
              gap="small"
              direction="row"
              align="center"
              justify="end"
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button
                label={
                  <Text color="white">
                    <strong>Delete</strong>
                  </Text>
                }
                onClick={onDeleteNote}
                primary
                color="status-critical"
              />
            </Box>
          </Box>
        </Layer>
      )}
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));