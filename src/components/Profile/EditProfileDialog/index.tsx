import React, { memo, useState, useEffect, useCallback, FC, ChangeEvent } from 'react'
import { Box, Button, Layer, Heading, Text, TextInput } from 'grommet';
import { Close } from 'grommet-icons';

interface EditProfileDialogProps {
  username: string;
  onDialogClose: () => void;
  onUpdateProfile: (newUsername: string) => void;
}

const EditProfileDialogComponent: FC<EditProfileDialogProps> = ({ username, onDialogClose, onUpdateProfile }) => {
  const [newUsername, setUsername] = useState<string>(username);
  const [disabled, setDisabled] = useState<boolean>(true);

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  useEffect(() => {
    setDisabled(newUsername === username);
  }, [setDisabled, newUsername, username]);

  const updateProfile = useCallback(() => {    
    onUpdateProfile(newUsername);
  }, [newUsername, onUpdateProfile]);

  return (
    <Layer position="center" onClickOutside={onDialogClose} onEsc={onDialogClose}>
      <Box pad="medium" gap="small" width="medium">
        <Box direction="row" align="center" justify="between">
          <Heading level={3} margin="none">
            Edit profile
          </Heading>
          <Button icon={<Close />} onClick={onDialogClose} />
        </Box>
        <Text>Username:</Text>
        <TextInput
          type="text"
          placeholder="username"
          value={newUsername}
          onChange={onChangeUsername}
        />
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad="small"
        >
          <Button
            primary
            label="Save"
            onClick={updateProfile}
            disabled={disabled}
          />
        </Box>
      </Box>
    </Layer>
  );
};

export const EditProfileDialog = memo(EditProfileDialogComponent);