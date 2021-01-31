import React, { FC, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { GET_NOTES } from 'gql/query';
import { Comment as CommentModel } from 'gql/models';
import { TOGGLE_FAVORITE_COMMENT, DELETE_COMMENT } from 'gql/mutation';
import { ActionButtons, DeleteActionButton } from 'components/ActionButtons';

interface CommentButtonsProps {
  isUserItem: boolean;
  comment: CommentModel;
  meId?: string;
}

export const CommentActionButtons: FC<CommentButtonsProps> = ({ isUserItem, comment }) => {
  const [toggleFavCommentMutation] = useMutation(TOGGLE_FAVORITE_COMMENT);
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const toggleFavorite = useCallback(() => {
    toggleFavCommentMutation({ variables: { id: comment.id } });
  }, [toggleFavCommentMutation, comment]);

  const onDeleteComment = useCallback(() => {
    deleteCommentMutation({ variables: { id: comment.id } });
  }, [deleteCommentMutation, comment]);

  return (
    <ActionButtons
      item={comment}
      isUserItem={isUserItem}
      onToogleItem={toggleFavorite}
    >
      {isUserItem &&
        <DeleteActionButton onDeleteItem={onDeleteComment} />
      }
    </ActionButtons>
  );
};
