import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Note as NoteModel, Comment as CommentModel } from 'gql/models';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from 'gql/mutation';
import { FavoritesActionButton } from './components/FavoritesActionButton';
import { CommentsActionButton } from './components/CommentsActionButton';
import { EditActionButton } from './components/EditActionButton';
import { DeleteActionButton } from './components/DeleteActionButton';
import * as Styled from './ActionButtons.styled';

export enum ActionButtonsType {
  NOTE = 'note',
  COMMENT = 'comment',
}

interface NoteButtonsProps extends RouteComponentProps {
  isUserNote: boolean;
  note: NoteModel | CommentModel;
  meId?: string;
}

const ActionButtonsComponent: FC<NoteButtonsProps> = ({ isUserNote, note: item, meId, history }) => {
  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const isFavoriteByMe = useMemo(() => {
    if (!meId) {
      return false;
    }

    return Boolean((item.favoritedBy || []).find(({ id }) => meId === id));
  }, [item, meId]);

  const favoritesList = useMemo(() => {
    return item.favoritedBy.map((favorite) => favorite.username);
  }, [item]);

  const toggleFavorite = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMutation({ variables: { id: item.id } });
  }, [toggleFavoriteMutation, item]);

  const editNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/edit/${item.id}`);
  }, [item, history]);

  const onDeleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    deleteNoteMutation({ variables: { id: item.id } });
  }, [deleteNoteMutation, item]);

  return (
    <Styled.ButtonContainer direction="row-responsive" gap="large">
      <FavoritesActionButton
        isFavoriteByMe={isFavoriteByMe}
        favoriteCount={item.favoriteCount}
        favoritesList={favoritesList}
        toggleFavorite={toggleFavorite}
      />
      <CommentsActionButton
        noteId={item.id}
        commentsLength={item.comments.length}
      />
      {isUserNote && 
        <EditActionButton onEditNote={editNote} />
      }
      {isUserNote &&
        <DeleteActionButton onDeleteNote={onDeleteNote} />
      }
    </Styled.ButtonContainer>
  );
};

export const ActionButtons = withRouter(ActionButtonsComponent);