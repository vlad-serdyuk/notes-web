import React, { FC } from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { DisplaySettings } from 'components/DisplaySettings';
import { ResetPasswordForm } from 'components/ResetPasswordForm';

export const SettingsPage: FC = () => (
  <Accordion animate={false}>
    <AccordionPanel label="Reset password">
      <Box pad="small" height="large" flex={false}>
        <ResetPasswordForm />
      </Box>
    </AccordionPanel>
    <AccordionPanel label="Display">
      <Box pad="small" height="large" flex={false}>
        <DisplaySettings />
      </Box>
    </AccordionPanel>
  </Accordion>
);
