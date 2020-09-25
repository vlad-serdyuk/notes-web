import React from 'react';
import { Box, Button, Heading, Text, TextInput } from 'grommet';

export const SettingsPage = () => {
  return (
    <Box>
      <Heading>Reset password</Heading>
      <Text>Old password</Text>
      <TextInput
        type="password"
        placeholder="Old password"
      />
      <Text>New password</Text>
      <TextInput
        type="password"
        placeholder="New password"
      />
      <Text>Confirm password</Text>
      <TextInput
        type="password"
        placeholder="Confirm password"
      />
      <Button
        primary
        label="Save"
        disabled={true}
      />
    </Box>
  ); 
};