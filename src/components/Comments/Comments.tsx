import React, { Fragment, FC } from 'react';

import { Comment as CommentModel } from 'gql/models';
import { Comment } from '../Comment';

interface CommentsProps {
  comments: Array<CommentModel>;
}

export const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </Fragment>
  );
};