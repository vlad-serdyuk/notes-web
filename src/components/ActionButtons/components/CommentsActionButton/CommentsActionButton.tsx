import React, { FC, memo, MouseEvent, useCallback } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Box } from 'grommet';
import { IconButton } from 'common/components/IconButton';

import { CommentIcon } from './CommentActionButton.styled';

interface CommentsActionButtonProps extends RouteComponentProps {
  noteId: string;
  commentsLength: number;
}

const CommentsActionButtonComponent: FC<CommentsActionButtonProps> = ({ noteId, commentsLength, history }) => {
  const addComment = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/note/${noteId}/comment/new`);
  }, [noteId, history]);

  return (
    <Box direction="row" align="center">
      <IconButton plain icon={<CommentIcon />} onClick={addComment} />
      {(commentsLength > 0) && commentsLength}
    </Box>
  );
};

export const CommentsActionButton = memo(withRouter(CommentsActionButtonComponent));
