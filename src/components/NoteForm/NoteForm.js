import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, TextArea, Button } from 'grommet';

const NoteFormComponent = ({ btnLabel, content, submitNote }) => {
  const [note, setNote] = useState(content);

  const onChangeNote = (event) => {
    setNote(event.target.value);
  };

  const onSubmit = () => {
    submitNote({ note });
  };

  return (
    <Box align="center">
      <Box gap="small" width="medium">
        <TextArea value={note} onChange={onChangeNote} />
        <Box justify="between" direction="row">
          <Button
            primary
            disabled={!note}
            label={btnLabel}
            onClick={onSubmit}
          />
        </Box>

      </Box>
    </Box>
  );
}

NoteFormComponent.propTypes = {
  btnLabel: PropTypes.string,
  content: PropTypes.string,
  submitNote: PropTypes.func.isRequired,
};

NoteFormComponent.defaultProps = {
  btnLabel: 'Create',
  content: '',
};

export const NoteForm = memo(NoteFormComponent);