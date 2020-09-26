import React, { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Button, Heading, Text, TextInput } from 'grommet';

import { RESET_PASSWORD } from '/gql/mutation';

export const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

  const [resetPasswordMutation, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: data => {
      history.push(`note/${data.createNote.id}`);
    },
  });

  const resetPassword = useCallback(() => {
    resetPasswordMutation({ variables: { oldPassword, newPassword } });
  }, [oldPassword, newPassword, confirmedNewPassword]);

  return (
    <Box>
      <Heading>Reset password</Heading>
      <Text>Old password</Text>
      <TextInput
        type="password"
        placeholder="Old password"
        value={oldPassword}
      />
      <Text>New password</Text>
      <TextInput
        type="password"
        placeholder="New password"
        value={newPassword}
      />
      <Text>Confirm password</Text>
      <TextInput
        type="password"
        placeholder="Confirm password"
        value={confirmedNewPassword}
      />
      <Button
        primary
        label="Save"
        disabled={true}
        onClick={resetPassword}
      />
    </Box>
  ); 
};