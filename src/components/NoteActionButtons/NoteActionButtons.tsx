import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Note as NoteModel } from 'gql/models';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from 'gql/mutation';
import { ActionButtons } from 'components/ActionButtons';

export enum ActionButtonsType {
  NOTE = 'note',
  COMMENT = 'comment',
}

interface NoteButtonsProps extends RouteComponentProps {
  isUserNote: boolean;
  note: NoteModel;
  meId?: string;
}

const NoteActionButtonsComponent: FC<NoteButtonsProps> = ({ isUserNote, note, meId, history }) => {
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
      itemType={ActionButtonsType.NOTE}
      onToogleItem={toggleFavorite}
      onDeleteItem={onDeleteNote}
    />
  );
};

export const NoteActionButtons = withRouter(NoteActionButtonsComponent);