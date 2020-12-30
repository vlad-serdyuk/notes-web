import React, { Fragment, FC } from 'react';

import { Comment } from 'gql/models';
import { FeedNote } from '../FeedNote';

interface CommentsProps {
  comments: Array<Comment>;
}

export const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => <FeedNote key={comment.id} note={comment} />)}
    </Fragment>
  );
};