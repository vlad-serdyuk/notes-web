import React, { FC, ChangeEvent, memo, useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useMutation, useApolloClient } from '@apollo/client';
import { Anchor, Layer, Box, Heading, TextInput, Text, MaskedInput, Button } from 'grommet';
import { MailOption, Close } from 'grommet-icons';

import { GET_ME } from 'gql/query';
import { SIGNIN_USER } from 'gql/mutation';
import { emailMask } from 'app/utils/validation';

const SignInComponent: FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const client = useApolloClient();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    refetchQueries: [{ query: GET_ME }],
    onCompleted: () => {
      client.writeData({ data: { isLoggedIn: true } });
      history.push('/');
    }
  });

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onSubmit = () => {
    signIn({ variables: { email, password } });
  };

  const onClose = () => {
    history.push('/');
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
            Confirm
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

export const SignIn = memo(SignInComponent);