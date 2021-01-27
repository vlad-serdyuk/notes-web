import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Note as NoteModel } from 'gql/models';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from 'gql/mutation';
import { ActionButtons } from 'components/ActionButtons';

interface NoteButtonsProps {
  isUserItem: boolean;
  note: NoteModel;
  meId?: string;
}

export const NoteActionButtons: FC<NoteButtonsProps> = ({ isUserItem, note, meId }) => {
  const history = useHistory();

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const toggleFavorite = useCallback(() => {
    toggleFavoriteMutation({ variables: { id: note.id } });
  }, [toggleFavoriteMutation, note]);

  const editNote = useCallback(() => {
    history.push(`/note/edit/${note.id}`);
  }, [note, history]);

  const onDeleteNote = useCallback(() => {
    deleteNoteMutation({ variables: { id: note.id } });
  }, [deleteNoteMutation, note]);

  return (
    <ActionButtons
      item={note}
      isUserItem={isUserItem}
      onToogleItem={toggleFavorite}
      onDeleteItem={onDeleteNote}
    />
  );
};
