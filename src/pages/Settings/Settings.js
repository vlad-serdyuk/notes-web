import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';

export const SettingsPage = () => (
  <Accordion animate={{}}>
    <AccordionPanel label="Reset password">
      <Box pad="small" height="large" flex={false}>
        <ResetPasswordForm />
      </Box>
    </AccordionPanel>
  </Accordion>
);
