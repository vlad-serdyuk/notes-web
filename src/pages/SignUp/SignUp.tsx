import React, { FC, ChangeEvent, memo, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { Anchor, Layer, Box, Heading, Text, TextInput, MaskedInput, Button } from 'grommet';
import { MailOption, Close } from 'grommet-icons';

import { GET_ME } from 'gql/query';
import { SIGNUP_USER } from 'gql/mutation';
import { emailMask } from 'app/utils/validation';

const SignUpComponent: FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    refetchQueries: [{ query: GET_ME }],
    onCompleted: () => {
      client.writeData({ data: { isLoggedIn: true } });
      history.push('/');
    }
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
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

export const SignUp = memo(SignUpComponent);