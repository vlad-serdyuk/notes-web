import React, { FC, Fragment, useCallback } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Comment } from 'gql/models';
import { GET_NOTE } from 'gql/query';
import { ADD_COMMENT } from 'gql/mutation';
import { CommentForm } from 'pages/AddComment/components/CommentForm';

export const AddCommentPage: FC<RouteComponentProps> = ({ history, match }) => {
  const [AddComment, { loading, error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_NOTE, variables: { id: match.params.id } }],
    onCompleted: (data: { addComment: Comment }) => {
      history.push(`/note/${data.addComment.noteId}`);
    },
  });

  const onAddComment = useCallback(({ comment }) => {
    AddComment({ variables: { content: comment, noteId: match.params.id } });
  }, [AddComment]);

  return (
    <Fragment>
      {loading && <p>loading...</p>}
      {error && <p>Error during saving the comment</p>}
      <CommentForm submitComment={onAddComment} />
    </Fragment>
  );
};
