import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from '@apollo/client';
import { Box, Button, Layer, Text } from 'grommet';
import { FormClose, StatusGood } from 'grommet-icons';

export const NotificationBar = ({ open, text }) => {
  const [isOpen, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      setTimeout(setOpen(true), 3000);
    }
  }, [open, isOpen]);

  if (!isOpen) {
    return null;
  }
  
  return (
    <Layer
      position="bottom"
      modal={false}
      margin={{ vertical: 'medium', horizontal: 'small' }}
      onEsc={onClose}
      responsive={false}
      plain
    >
      <Box
        align="center"
        direction="row"
        gap="small"
        justify="between"
        round="medium"
        elevation="medium"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background="status-ok"
      >
        <Box align="center" direction="row" gap="xsmall">
          <StatusGood />
          <Text>{text}</Text>
        </Box>
        <Button icon={<FormClose />} onClick={onClose} plain />
      </Box>
    </Layer>
  )
};

NotificationBar.propTypes = {
  children: PropTypes.element.isRequired
};
  