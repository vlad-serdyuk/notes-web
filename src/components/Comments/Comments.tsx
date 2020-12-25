import React, { Fragment, FC } from 'react';

import { Note as NoteModel } from 'gql/models';
import { Note } from '../Note';

interface CommentsProps {
  comments: Array<NoteModel>;
}

export const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => <Note key={comment.id} note={comment} />)}
    </Fragment>
  );
};