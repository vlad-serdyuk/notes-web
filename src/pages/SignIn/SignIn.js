import React, { memo, useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Layer, Box, Heading, TextInput, MaskedInput, Button } from 'grommet';
import { MailOption, Close } from 'grommet-icons';
import { saveToken } from '../../services/SessionService';

import { emailMask } from '../../utils/validation';

const SignInComponent = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      saveToken(data.signUp);
      props.history.push('/');
    }
  });

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = () => {
    signUp({ variables: { email, username, password } });
  };

  const onClose = () => {
    props.history.push('/');
  }

  useEffect(() => {
    setDisabled(
      email.length === 0 
      || username.length === 0
      || password.length === 0
      || loading
    );
  }, [setDisabled, email, username, password, loading]);

  return (
    <Layer
      position="center"
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box pad="medium" gap="small" width="medium">
        <Box direction="row" align="center" justify="between">
          <Heading level={3} margin="none">
            Sign In
          </Heading>
          <Button icon={<Close />} onClick={onClose} />
        </Box>
        <MaskedInput
          reverse
          icon={<MailOption />}
          mask={emailMask}
          value={email}
          onChange={onChangeEmail}
        />
        <TextInput
          type="text"
          placeholder="username"
          value={username}
          onChange={onChangeUsername}
        />
        <TextInput
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <Button
          disabled={disabled}
          label="Sign In"
          onClick={onSubmit}
        />
      </Box>
    </Layer>
  );
};

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

export default memo(SignInComponent);