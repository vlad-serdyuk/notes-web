import React, { memo, FC, MouseEvent } from 'react'
import { Box, Button, Layer, Heading, Text } from 'grommet';
import { Close } from 'grommet-icons';

interface IConfirmDialogProps {
  onDialogClose: (e: MouseEvent) => void,
  onDeleteNote: (e: MouseEvent) => void,
}

const ConfirmDialogComponent: FC<IConfirmDialogProps> = ({ onDialogClose, onDeleteNote }) => {
  return (
    <Layer position="center" onClickOutside={onDialogClose} onEsc={onDialogClose}>
      <Box pad="medium" gap="small" width="medium">
        <Box direction="row" align="center" justify="between">
          <Heading level={3} margin="none">
            Confirm
          </Heading>
          <Button icon={<Close />} onClick={onDialogClose} />
        </Box>
        <Text>Are you sure you want to delete?</Text>
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="end"
          pad={{ top: 'medium', bottom: 'small' }}
        >
          <Button
            label={
              <Text color="white">
                <strong>Delete</strong>
              </Text>
            }
            onClick={onDeleteNote}
            primary
            color="status-critical"
          />
        </Box>
      </Box>
    </Layer>
  );
};

export const ConfirmDialog = memo(ConfirmDialogComponent);