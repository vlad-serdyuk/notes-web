import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Layer, Text } from 'grommet';
import { FormClose, StatusGood } from 'grommet-icons';

import { SHOW_NOTIFIFCATION } from '/gql/local-query';

const NOTIFICATION_BAR_SHOWING_TIME = 3000;

export const NotificationBar = () => {
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState('');

  const { data = {}, client } = useQuery(SHOW_NOTIFIFCATION);

  const onClose = () => setOpen(false);

  useEffect(() => {    
    if (data.show) {
      setOpen(true);
      setText(data.text);
      window.setTimeout(() => closeNotificationBar(), NOTIFICATION_BAR_SHOWING_TIME);
    }
  }, [data, isOpen]);

  const closeNotificationBar = () => {
    setOpen(false);
    setText('');
    client.writeQuery({
      query: SHOW_NOTIFIFCATION,
      data: {
        show: false,
        text: '',
      },
    });
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
  