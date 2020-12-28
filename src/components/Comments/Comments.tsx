import React, { Fragment, FC } from 'react';

import { Comment } from 'gql/models';
import { Note } from '../Note';

interface CommentsProps {
  comments: Array<Comment>;
}

export const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => <Note key={comment.id} note={comment} />)}
    </Fragment>
  );
};