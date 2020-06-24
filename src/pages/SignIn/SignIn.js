import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { Anchor, Layer, Box, Heading, TextInput, Text, MaskedInput, Button } from 'grommet';
import { MailOption, Close } from 'grommet-icons';

import { saveToken } from '../../services/SessionService';
import { emailMask } from '../../utils/validation';
import { SIGNIN_USER } from '../../gql/mutation';

const SignInComponent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const client = useApolloClient();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      saveToken(data.signIn);
      client.writeData({ data: { isLoggedIn: true } });
      props.history.push('/');
    }
  });

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = () => {
    signIn({ variables: { email, password } });
  };

  const onClose = () => {
    props.history.push('/');
  }

  useEffect(() => {
    setDisabled(
      email.length === 0 
      || password.length === 0
      || loading
    );
  }, [setDisabled, email, password, loading]);

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
          type="password"
          placeholder="password"
          value={password}
          onChange={onChangePassword}
        />
        <Button
          primary
          disabled={disabled}
          label="Sign In"
          onClick={onSubmit}
        />
        <Box align="center">
          <Text>
            Don't have an account?{' '}
            <Link to="/sign-up"><Anchor label="Sign Up" as="span" /></Link>
          </Text>
          {error && <p>Error signing in</p>}
        </Box>
      </Box>
    </Layer>
  );
};

export default memo(SignInComponent);