import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { Box, Button, Layer, Text } from 'grommet';
import { FormClose, StatusGood } from 'grommet-icons';

import { SHOW_NOTIFIFCATION } from '/gql/query';

export const NotificationBar = ({ text = 'aome text' }) => {
  const [isOpen, setOpen] = useState(false);

  const { data: { isNotificationShown } = {} } = useQuery(SHOW_NOTIFIFCATION);
  const client = useApolloClient();

  const onClose = () => setOpen(false);

  useEffect(() => {
    if (!isOpen && isNotificationShown) {
      setOpen(true);
    }
  }, [isNotificationShown]);

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
  