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

  const toggleFavorite = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMutation({ variables: { id: note.id } });
  }, [toggleFavoriteMutation, note]);

  const editNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/edit/${note.id}`);
  }, [note, history]);

  const onDeleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    deleteNoteMutation({ variables: { id: note.id } });
  }, [deleteNoteMutation, note]);

  return (
    <ActionButtons
      item={note}
      itemType={ActionButtonsType.NOTE}
      onToogleItem={toggleFavoriteMutation}
      onDeleteItem={deleteNoteMutation}
    />
  );
};

export const NoteActionButtons = withRouter(NoteActionButtonsComponent);