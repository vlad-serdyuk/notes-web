import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { Layer, Box, Heading, Text, TextInput, MaskedInput, Button } from 'grommet';
import { MailOption, Close } from 'grommet-icons';

import { emailMask } from '/utils/validation';
import { SIGNUP_USER } from '/gql/mutation';

const SignUpComponent = ({ history }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: () => {
      client.writeData({ data: { isLoggedIn: true } });
      history.push('/');
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
    history.push('/');
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
        {error && <p>Error signing up</p>}
        <Box align="center">
          <Text>
            Already have an account?{' '}
            <Link to="/sign-in"><Anchor label="Sign In" as="span" /></Link>
          </Text>
        </Box>
      </Box>
    </Layer>
  );
};

SignUpComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export default memo(SignUpComponent);