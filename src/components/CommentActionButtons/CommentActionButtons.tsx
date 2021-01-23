import React, { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Comment as CommentModel } from 'gql/models';
import { TOGGLE_FAVORITE_NOTE, DELETE_COMMENT } from 'gql/mutation';
import { ActionButtons, ActionButtonsType } from 'components/ActionButtons';

interface CommentButtonsProps {
  isUserItem: boolean;
  comment: CommentModel;
  meId?: string;
}

export const CommentActionButtons: FC<CommentButtonsProps> = ({ isUserItem, comment, meId }) => {
  const history = useHistory();

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const toggleFavorite = useCallback(() => {
    toggleFavoriteMutation({ variables: { id: comment.id } });
  }, [toggleFavoriteMutation, comment]);

  const onDeleteNote = useCallback(() => {
    deleteCommentMutation({ variables: { id: comment.id } });
  }, [deleteCommentMutation, comment]);

  return (
    <ActionButtons
      item={comment}
      isUserItem={isUserItem}
      itemType={ActionButtonsType.COMMENT}
      onToogleItem={toggleFavorite}
      onDeleteItem={onDeleteNote}
    />
  );
};
