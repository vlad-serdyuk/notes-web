import React, { FC, memo, MouseEvent, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from 'grommet';
import { IconButton } from 'common/components/IconButton';

import { CommentIcon } from './CommentsActionButton.styled';

interface CommentsActionButtonProps {
  noteId: string;
  commentsLength: number;
}

const CommentsActionButtonComponent: FC<CommentsActionButtonProps> = ({ noteId, commentsLength }) => {
  const history = useHistory();

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

export const CommentsActionButton = memo(CommentsActionButtonComponent);
