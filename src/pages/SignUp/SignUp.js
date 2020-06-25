import React, { memo, useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { Layer, Box, Heading, TextInput, MaskedInput, Button } from 'grommet';
import { MailOption, Close } from 'grommet-icons';

import { emailMask } from '/utils/validation';
import { SIGNUP_USER } from '/gql/mutation';

const SignInComponent = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      client.writeData({ data: { isLoggedIn: true } });
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
            Sign Up
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
          primary
          disabled={disabled}
          label="Sign Up"
          onClick={onSubmit}
        />
        {error && <p>Error signing in</p>}
      </Box>
    </Layer>
  );
};

export default memo(SignInComponent);