import React, { FC, Fragment, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Comment } from 'gql/models';
import { GET_NOTES } from 'gql/query';
import { CREATE_NOTE } from 'gql/mutation';
import { CommentForm } from 'components/CommentForm';

export const CreateCommentPage: FC<RouteComponentProps> = ({ history }) => {
  const [createComment, { loading, error }] = useMutation(CREATE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
    onCompleted: (data: { createComment: Comment }) => {
      history.push(`comment/${data.createNote.id}`);
    },
  });

  const onCreateComment = useCallback(({ comment }) => {
    createComment({ variables: { content: comment } });
  }, [createComment]);

  return (
    <Fragment>
      {loading && <p>loading...</p>}
      {error && <p>Error during saving the comment</p>}
      <CommentForm submitComment={onCreateComment} />
    </Fragment>
  );
};
