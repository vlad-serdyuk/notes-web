import React, { memo, useState, FC, ChangeEvent } from 'react';
import { Box, TextArea, Button } from 'grommet';

import { ISubmitNoteArgs } from './ISubmitNoteArgs';

interface INoteFormProps {
  btnLabel?: string;
  content?: string;
  submitComment: ({ note }: ISubmitNoteArgs) => void;
}

const CommentFormComponent: FC<INoteFormProps> = ({ btnLabel = 'Create', content = '', submitComment }) => {
  const [note, setNote] = useState<string>(content);

  const onChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const onSubmit = () => submitComment({ note });

  return (
    <Box align="center">
      <Box gap="small" width="medium">
        <TextArea value={note} onChange={onChangeNote} />
        <Button
          primary
          disabled={!note}
          label={btnLabel}
          onClick={onSubmit}
        />
      </Box>
    </Box>
  );
}

export const CommentForm = memo(CommentFormComponent);