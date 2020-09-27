import React, { useState, useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Heading, Text, TextInput } from 'grommet';

import { RESET_PASSWORD } from '/gql/mutation';

export const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [resetPasswordMutation, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: data => {
      history.push(`note/${data.createNote.id}`);
    },
  });

  const resetPassword = useCallback(() => {
    resetPasswordMutation({ variables: { oldPassword, newPassword } });
  }, [oldPassword, newPassword, confirmedNewPassword]);

  const onChangeOldPassword = (event) => setOldPassword(event.target.value);
  const onChangeNewPassword = (event) => setNewPassword(event.target.value);
  const onChangeConfirmPassword = (event) => setConfirmedNewPassword(event.target.value);

  useEffect(() => {
    setDisabled(!newPassword || newPassword !== confirmedNewPassword);
  }, [setDisabled, newPassword, confirmedNewPassword]);

  return (
    <Box gap="small">
      <Text size="large">Reset password</Text>
      <Text>Old password</Text>
      <TextInput
        type="password"
        placeholder="Old password"
        value={oldPassword}
        onChange={onChangeOldPassword}
      />
      <Text>New password</Text>
      <TextInput
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={onChangeNewPassword}
      />
      <Text>Confirm password</Text>
      <TextInput
        type="password"
        placeholder="Confirm password"
        value={confirmedNewPassword}
        onChange={onChangeConfirmPassword}
      />
      <Button
        primary
        label="Save"
        disabled={disabled}
        onClick={resetPassword}
      />
    </Box>
  ); 
};