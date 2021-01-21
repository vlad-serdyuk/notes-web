import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Note as NoteModel, Comment as CommentModel } from 'gql/models';
import { useGetMeQuery } from 'common/hooks/queries';
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
  onToogleItem: () => void;
  onDeleteItem: () => void;
}

const ActionButtonsComponent: FC<NoteButtonsProps> = ({ isUserNote, note: item, history, onToogleItem, onDeleteItem }) => {
  const { data: { me } } = useGetMeQuery();

  const isFavoriteByMe = useMemo(() => {
    if (!me.id) {
      return false;
    }

    return Boolean((item.favoritedBy || []).find(({ id }) => me.id === id));
  }, [item, me]);

  const favoritesList = useMemo(() => {
    return item.favoritedBy.map((favorite) => favorite.username);
  }, [item]);

  const toggleFavorite = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onToogleItem();
  }, [onToogleItem]);

  const editNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/edit/${item.id}`);
  }, [item, history]);

  const onDeleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onDeleteItem();
  }, [onDeleteItem]);

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