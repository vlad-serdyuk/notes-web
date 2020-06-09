import React, { useState } from 'react';
import { Layer, Box, Heading, TextInput, Button } from 'grommet';

export const SignIn = () => {
  const [value, setValue] = useState('');
  const [reveal, setReveal] = React.useState(false);

  return (
    <Layer position="center">
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Sign In
        </Heading>
        <TextInput
          plain
          type="text"
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <Button
          label="Sign In"
          onClick={() => setReveal(!reveal)}
        />
      </Box>
    </Layer>
  );
};