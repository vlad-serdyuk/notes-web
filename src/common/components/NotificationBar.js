import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Layer, Text } from 'grommet';
import { FormClose, StatusGood } from 'grommet-icons';

import { SHOW_NOTIFIFCATION } from '/gql/local-query';

const NOTIFICATION_BAR_SHOWING_TIME = 3000;

export const NotificationBar = ({ text = 'some text' }) => {
  const [isOpen, setOpen] = useState(false);

  const { data: { notificationBar } = {}, client } = useQuery(SHOW_NOTIFIFCATION);
  console.log(notificationBar);

  const onClose = () => setOpen(false);

  useEffect(() => {
    console.log(notificationBar);
    
    if (!isOpen && notificationBar) {
      setOpen(true);
      window.setTimeout(() => closeNotificationBar(), NOTIFICATION_BAR_SHOWING_TIME);
    }
  }, [notificationBar]);

  const closeNotificationBar = () => {
    setOpen(false);
    client.writeData({ data: { notificationBar: { show: false } } });
  };

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
  