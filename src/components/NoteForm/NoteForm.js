import React, { memo, useState } from 'react';
import { Box, TextArea, Button } from 'grommet';

const NoteFormComponent = ({ btnLabel = 'Create', content = '', submitNote }) => {
  const [note, setNote] = useState(content);

  const onChangeNote = (event) => {
    setNote(event.target.value);
  };

  const onSubmit = () => {
    submitNote({ note });
  };

  return (
    <Box align="center">
      <Box gap="small" width="medium" align="center">
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

export const NoteForm = memo(NoteFormComponent);