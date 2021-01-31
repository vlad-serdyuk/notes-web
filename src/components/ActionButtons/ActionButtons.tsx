import React, { FC, MouseEvent, useCallback, useMemo } from 'react';

import { Note as NoteModel, Comment as CommentModel } from 'gql/models';
import { useGetMeQuery } from 'common/hooks/queries';
import { FavoritesActionButton } from './components/FavoritesActionButton';
import { ButtonContainer } from './ActionButtons.styled';

interface ActionButtonsProps {
  item: NoteModel | CommentModel;
  isUserItem: boolean;
  onToogleItem: () => void;
}

export const ActionButtons: FC<ActionButtonsProps> = ({ 
  item,
  children,
  onToogleItem,
 }) => {
  const { data: { me } } = useGetMeQuery();

  const isFavoriteByMe = useMemo(() => {
    if (!me.id) {
      return false;
    }

    return Boolean((item.favoritedBy || []).find(({ id }) => me.id === id));
  }, [item, me]);

  const favoritesList = useMemo(() => {
    return (item.favoritedBy || []).map((favorite) => favorite.username);
  }, [item]);

  const toggleFavorite = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onToogleItem();
  }, [onToogleItem]);

  return (
    <ButtonContainer direction="row-responsive" gap="large">
      <FavoritesActionButton
        isFavoriteByMe={isFavoriteByMe}
        favoriteCount={item.favoriteCount}
        favoritesList={favoritesList}
        toggleFavorite={toggleFavorite}
      />
      {children}
    </ButtonContainer>
  );
};