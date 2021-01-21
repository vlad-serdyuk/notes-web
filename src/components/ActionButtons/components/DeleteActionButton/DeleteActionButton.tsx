import React, { FC, Fragment, memo, MouseEvent, useCallback, useState } from 'react';
import { IconButton } from 'common/components/IconButton';

import { ConfirmDialog } from './components/ConfirmDialog';
import { DeleteIcon } from './DeleteActionButton.styled';

interface DeleteActionButtonProps {
  onDeleteNote: (e: MouseEvent) => void;
}

const DeleteActionButtonComponent: FC<DeleteActionButtonProps> = ({ onDeleteNote }) => {
  const [isDeleteConfirmDialogOpen, setDeleteConfirmDialogOpen] = useState<boolean>(false);

  const showDeleteNoteDialog = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmDialogOpen(true);
  }, []);

  const deleteConfirmDialogClose = (e: MouseEvent) => {
    e.stopPropagation();
    setDeleteConfirmDialogOpen(false);
  };

  return (
    <Fragment>
        <IconButton plain icon={<DeleteIcon />} onClick={showDeleteNoteDialog} />
        {isDeleteConfirmDialogOpen
          && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={deleteConfirmDialogClose} />}
    </Fragment>
  );
};

export const DeleteActionButton = memo(DeleteActionButtonComponent);