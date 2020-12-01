import React, { FC } from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';

export const SettingsPage: FC = () => (
  <Accordion animate={false}>
    <AccordionPanel label="Reset password">
      <Box pad="small" height="large" flex={false}>
        <ResetPasswordForm />
      </Box>
    </AccordionPanel>
  </Accordion>
);
