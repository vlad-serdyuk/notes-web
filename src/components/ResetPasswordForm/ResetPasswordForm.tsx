import React, { useState, useCallback, useEffect, FC, ChangeEvent } from 'react';
import { useMutation } from '@apollo/client';
import { Box, Text, TextInput } from 'grommet';

import { SHOW_NOTIFIFCATION } from '../../gql/local-query';
import { RESET_PASSWORD } from '../../gql/mutation';
import { SubmitButton } from './ResetPasswordForm.styled';

const MIN_PASSWORD_LENGTH = 6;

export const ResetPasswordForm: FC = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmedNewPassword, setConfirmedNewPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const [resetPasswordMutation, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      setOldPassword('');
      setNewPassword('');
      setConfirmedNewPassword('');
    },
    update: (cache: any) => {
      cache.writeQuery({
        query: SHOW_NOTIFIFCATION,
        data: {
          show: true,
          text: 'Please, enter the correct password',
        },
      });
    }
  });

  const resetPassword = useCallback(() => {
    resetPasswordMutation({ variables: { oldPassword, newPassword } });
  }, [oldPassword, newPassword, confirmedNewPassword]);

  const onChangeOldPassword = (event: ChangeEvent<HTMLInputElement>) => setOldPassword(event.target.value);
  const onChangeNewPassword = (event: ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value);
  const onChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => setConfirmedNewPassword(event.target.value);

  useEffect(() => {
    const arePasswordsNotEqual = !newPassword || newPassword !== confirmedNewPassword;
    const isPasswordProperLength = newPassword.length >= MIN_PASSWORD_LENGTH;
    setDisabled(arePasswordsNotEqual || !isPasswordProperLength || loading);
  }, [setDisabled, newPassword, confirmedNewPassword, loading]);

  return (
    <Box gap="small">
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
      {error && <Text color="red">The password is incorrect</Text>}
      <Box align="end">
        <SubmitButton
          primary
          label="Save"
          disabled={disabled}
          onClick={resetPassword}
        />
      </Box>
    </Box>
  ); 
};