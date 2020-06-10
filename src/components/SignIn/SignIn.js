import React, { memo, useState } from 'react';
import { Layer, Box, Heading, TextInput, MaskedInput, Button } from 'grommet';
import { MailOption } from 'grommet-icons';

import { emailMask } from '../../utils/validation';

const SignInComponent = () => {
  const [value, setValue] = useState('');
  const [reveal, setReveal] = React.useState(false);

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
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        <TextInput
          type="password"
          placeholder="password"
          value={value}
          onChange={event => setValue(event.target.value)}
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

export const SignIn = memo(SignInComponent);