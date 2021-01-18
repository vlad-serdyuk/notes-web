import React, { FC, Fragment, MouseEvent } from 'react';
import { Box, Drop } from 'grommet';
import { ConfirmDialog } from './ConfirmDialog';

interface NoteButtonsDialogsProps {
  isDeleteConfirmDialogOpen: boolean;
  onDeleteNote: (e: MouseEvent) => void;
  onDeleteConfirmDialogClose: (e: MouseEvent) => void;
}

export const NoteButtonsDialogs: FC<NoteButtonsDialogsProps> = ({ 
  isDeleteConfirmDialogOpen,
  onDeleteNote,
  onDeleteConfirmDialogClose,
 }) => {
  return (
    <Fragment>
      {isDeleteConfirmDialogOpen
        && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={onDeleteConfirmDialogClose} />}
    </Fragment>
  );
}