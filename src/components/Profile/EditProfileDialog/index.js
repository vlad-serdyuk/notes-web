import React, { memo, useState } from 'react'
import { Box, Button, Layer, Heading, Text, TextInput } from 'grommet';
import { Close } from 'grommet-icons';

const EditProfileDialogComponent = ({ username, onDialogClose, onUpdateProfile }) => {
  const [newUsername, setUsername] = useState(username);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Layer position="center" onClickOutside={onDialogClose} onEsc={onDialogClose}>
      <Box pad="medium" gap="small" width="medium">
        <Box direction="row" align="center" justify="between">
          <Heading level={3} margin="none">
            Edit profile
          </Heading>
          <Button icon={<Close />} onClick={onDialogClose} />
        </Box>
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
          pad={{ top: "medium", bottom: "small" }}
        >
          <Button
            label={
              <Text color="white">
                <strong>Save</strong>
              </Text>
            }
            onClick={onUpdateProfile}
            primary
            color="status-critical"
          />
        </Box>
      </Box>
    </Layer>
  );
};

export const EditProfileDialog = memo(EditProfileDialogComponent);