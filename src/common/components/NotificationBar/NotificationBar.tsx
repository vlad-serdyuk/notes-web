import React, { FC, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Layer, Text } from 'grommet';
import { FormClose, StatusGood } from 'grommet-icons';

import { SHOW_NOTIFIFCATION } from 'gql/local-query';
import { closeNotification } from 'app/services/Notification';

const NOTIFICATION_BAR_SHOWING_TIME = 3000;

export const NotificationBar: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>('');

  const { data = {} } = useQuery(SHOW_NOTIFIFCATION);

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
    closeNotification();
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
  