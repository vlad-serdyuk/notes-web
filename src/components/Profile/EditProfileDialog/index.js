import React, { memo, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types';
import { Box, Button, Layer, Heading, TextInput } from 'grommet';
import { Close } from 'grommet-icons';

const EditProfileDialogComponent = ({ username, onDialogClose, onUpdateProfile }) => {
  const [newUsername, setUsername] = useState(username);
  const [disabled, setDisabled] = useState(true);

  const onChangeUsername = (event) => {
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

EditProfileDialogComponent.propTypes = {
  username: PropTypes.string.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onUpdateProfile: PropTypes.func.isRequired,
};

export const EditProfileDialog = memo(EditProfileDialogComponent);