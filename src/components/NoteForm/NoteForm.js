import React, { memo, useState } from 'react';
import { Box, TextArea, Button } from 'grommet';

const NoteFormComponent = ({ submitNote }) => {
  const [note, setNote] = useState('');

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
          label="Create"
          onClick={onSubmit}
        />
      </Box>
    </Box>
  );
}

export const NoteForm = memo(NoteFormComponent);