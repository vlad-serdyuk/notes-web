import React, { memo, useState, FC, ChangeEvent } from 'react';
import { Box, TextArea, Button } from 'grommet';

interface ICommentFormProps {
  btnLabel?: string;
  content?: string;
  submitComment: ({ comment }: { comment: string }) => void;
}

const CommentFormComponent: FC<ICommentFormProps> = ({ btnLabel = 'Create', content = '', submitComment }) => {
  const [comment, setComment] = useState<string>(content);

  const onChangeComment = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const onSubmit = () => submitComment({ comment });

  return (
    <Box align="center">
      <Box gap="small" width="medium">
        <TextArea value={comment} onChange={onChangeComment} />
        <Button
          primary
          disabled={!comment}
          label={btnLabel}
          onClick={onSubmit}
        />
      </Box>
    </Box>
  );
}

export const CommentForm = memo(CommentFormComponent);