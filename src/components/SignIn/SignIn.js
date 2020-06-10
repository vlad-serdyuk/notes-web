import React, { memo, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';
import { Layer, Box, Heading, TextInput, MaskedInput, Button } from 'grommet';
import { MailOption } from 'grommet-icons';

import { emailMask } from '../../utils/validation';

const SignInComponent = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Layer position="center">
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Sign In
        </Heading>
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
          disabled
          label="Sign In"
          onClick={() => setReveal(!reveal)}
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

export const SignIn = memo(SignInComponent);