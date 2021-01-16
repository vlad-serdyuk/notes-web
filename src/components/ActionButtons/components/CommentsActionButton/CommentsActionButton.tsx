import React, { FC, memo, MouseEvent } from 'react';
import { Box } from 'grommet';
import { IconButton } from 'common/components/IconButton';

import { CommentIcon } from './CommentActionButton.styled';

interface CommentsActionButtonProps {
  addComment: (e: MouseEvent) => void;
  comments: Array<any>;
}

const CommentsActionButtonComponent: FC<CommentsActionButtonProps> = ({ comments = [], addComment }) => (
  <Box direction="row" align="center">
    <IconButton plain icon={<CommentIcon />} onClick={addComment} />
    {(comments.length > 0) && comments.length}
  </Box>
);

export const CommentsActionButton = memo(CommentsActionButtonComponent);
