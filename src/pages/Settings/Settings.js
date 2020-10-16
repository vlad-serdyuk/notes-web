import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { ResetPasswordForm } from '/components/ResetPasswordForm/ResetPasswordForm';

export const SettingsPage = () => (
  <Accordion animate={{}}>
    <AccordionPanel label="Panel 1">
      <Box background="light-2" overflow="auto" height="medium">
        <Box height="large" flex={false}>
          <ResetPasswordForm />
        </Box>
      </Box>
    </AccordionPanel>
    <AccordionPanel label="Panel 2">
      <Box background="light-2" style={{ height: '50px' }}>
        Panel 2 contents
      </Box>
    </AccordionPanel>
    <AccordionPanel label="Panel 3">
      <Box background="light-2" style={{ height: '300px' }}>
        Panel 3 contents
      </Box>
    </AccordionPanel>
  </Accordion>
);
