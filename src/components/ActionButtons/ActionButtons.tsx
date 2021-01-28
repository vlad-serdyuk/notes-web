import React, { FC, MouseEvent, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { Note as NoteModel, Comment as CommentModel } from 'gql/models';
import { useGetMeQuery } from 'common/hooks/queries';
import { FavoritesActionButton } from './components/FavoritesActionButton';
import { CommentsActionButton } from './components/CommentsActionButton';
import { EditActionButton } from './components/EditActionButton';
import { DeleteActionButton } from './components/DeleteActionButton';
import * as Styled from './ActionButtons.styled';

interface ActionButtonsProps {
  item: NoteModel | CommentModel;
  isCommentBtnShown: boolean;
  isEditBtnShown: boolean;
  isDeleteBtnShown: boolean;
  onToogleItem: () => void;
  onDeleteItem: () => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ 
  item,
  isCommentBtnShown,
  isEditBtnShown,
  isDeleteBtnShown,
  onToogleItem,
  onDeleteItem,
 }) => {
  const history = useHistory();
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

  const editItem = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/edit/${item.id}`);
  }, [item, history]);

  const deleteItem = useCallback((e: MouseEvent) => {
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
      {isCommentBtnShown && 
        <CommentsActionButton
          noteId={item.id}
          commentsLength={(item.comments || []).length}
        />
      }
      {isEditBtnShown && 
        <EditActionButton onEditItem={editItem} />
      }
      {isDeleteBtnShown &&
        <DeleteActionButton onDeleteItem={deleteItem} />
      }
    </Styled.ButtonContainer>
  );
};