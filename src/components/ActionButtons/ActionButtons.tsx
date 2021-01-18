import React, { FC, Fragment, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Note as NoteModel } from 'gql/models';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from 'gql/mutation';
import { IconButton } from 'common/components/IconButton';
import { FavoritesActionButton } from './components/FavoritesActionButton';
import { CommentsActionButton } from './components/CommentsActionButton';
import { NoteButtonsDialogs } from './components/ActionButtonsDialogs';
import * as Styled from './ActionButtons.styled';

export enum ActionButtonsType {
  NOTE = 'note',
  COMMENT = 'comment',
}

interface NoteButtonsProps extends RouteComponentProps {
  isUserNote: boolean;
  note: NoteModel;
  meId?: string;
}

const ActionButtonsComponent: FC<NoteButtonsProps> = ({ isUserNote, note, meId, history }) => {
  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const isFavoriteByMe = useMemo(() => {
    if (!meId) {
      return false;
    }

    return Boolean((note.favoritedBy || []).find(({ id }) => meId === id));
  }, [note, meId]);

  const favoritesList = useMemo(() => {
    return note.favoritedBy.map((favorite) => favorite.username);
  }, [note]);

  const onDeleteConfirmDialogClose = (e: MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmDialogOpen(false);
  }

  const toggleFavorite = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMutation({ variables: { id: note.id } });
  }, [toggleFavoriteMutation, note]);

  const editNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/edit/${note.id}`);
  }, [note, history]);

  const addComment = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/${note.id}/comment/new`);
  }, [note, history]);

  const deleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmDialogOpen(true);
  }, []);

  const onDeleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    deleteNoteMutation({ variables: { id: note.id } });
  }, [deleteNoteMutation, note]);

  return (
    <Fragment>
      <Styled.ButtonContainer direction="row-responsive" gap="large">
        <FavoritesActionButton
          isFavoriteByMe={isFavoriteByMe}
          favoriteCount={note.favoriteCount}
          favoritesList={favoritesList}
          toggleFavorite={toggleFavorite}
        />
        <CommentsActionButton
          comments={note.comments}
          addComment={addComment}
        />
        {isUserNote && <IconButton plain icon={<Styled.EditIcon />} onClick={editNote} />}
        {isUserNote && <IconButton plain icon={<Styled.DeleteIcon />} onClick={deleteNote} />}
      </Styled.ButtonContainer>
      <NoteButtonsDialogs
        isDeleteConfirmDialogOpen={isDeleteConfirmDialogOpen}
        onDeleteNote={onDeleteNote}
        onDeleteConfirmDialogClose={onDeleteConfirmDialogClose}
      />
    </Fragment>
  );
};

export const ActionButtons = withRouter(ActionButtonsComponent);