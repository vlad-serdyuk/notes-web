import React, { useState, useCallback, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { Box, Button, Text, TextInput } from 'grommet';

import { RESET_PASSWORD } from '/gql/mutation';

const MIN_PASSWORD_LENGTH = 6;

export const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const client = useApolloClient();

  const [resetPasswordMutation, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      setOldPassword('');
      setNewPassword('');
      setConfirmedNewPassword('');
      // const g = client.readData();
      client.writeData({ data: { isNotificationShown: true } });
    },
  });

  const resetPassword = useCallback(() => {
    resetPasswordMutation({ variables: { oldPassword, newPassword } });
  }, [oldPassword, newPassword, confirmedNewPassword]);

  const onChangeOldPassword = (event) => setOldPassword(event.target.value);
  const onChangeNewPassword = (event) => setNewPassword(event.target.value);
  const onChangeConfirmPassword = (event) => setConfirmedNewPassword(event.target.value);

  useEffect(() => {
    const arePasswordsNotEqual = !newPassword || newPassword !== confirmedNewPassword;
    const isPasswordProperLength = newPassword.length >= MIN_PASSWORD_LENGTH;
    setDisabled(arePasswordsNotEqual || !isPasswordProperLength);
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