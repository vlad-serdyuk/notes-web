import React, { FC, Fragment, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Comment } from 'gql/models';
import { GET_NOTES } from 'gql/query';
import { ADD_COMMENT } from 'gql/mutation';
import { CommentForm } from 'components/CommentForm';

export const AddCommentPage: FC<RouteComponentProps> = ({ history }) => {
  const [AddComment, { loading, error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: (data: { createComment: Comment }) => {
      history.push(`comment/${data.createNote.id}`);
    },
  });

  const onAddComment = useCallback(({ comment, noteId }) => {
    AddComment({ variables: { content: comment } });
  }, [AddComment]);

  return (
    <Fragment>
      {loading && <p>loading...</p>}
      {error && <p>Error during saving the comment</p>}
      <CommentForm submitComment={onAddComment} />
    </Fragment>
  );
};
