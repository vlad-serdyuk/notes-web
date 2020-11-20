import React, { memo, useState, FC, ChangeEvent } from 'react';
import { Box, TextArea, Button } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';

interface INoteFormProps {
  btnLabel: string;
  content: string;
  submitNote: ({ note, privacy }: { note: any, privacy: boolean } ) => void;
}

const NoteFormComponent: FC<INoteFormProps> = ({ btnLabel = 'Create', content = '', submitNote }) => {
  const [note, setNote] = useState<string>(content);
  const [privacy, setPrivacy] = useState<boolean>(false);

  const onChangeNote = (event: ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const onSubmit = () => submitNote({ note, privacy });
  const togglePrivacy = () => setPrivacy(!privacy);

  return (
    <Box align="center">
      <Box gap="small" width="medium">
        <TextArea value={note} onChange={onChangeNote} />
        <Box justify="between" direction="row">
          <Button
            label={privacy ? 'Private note' : 'Public note'}
            icon={privacy ? <Lock /> : <Unlock />}
            onClick={togglePrivacy}
          />
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

export const NoteForm = memo(NoteFormComponent);