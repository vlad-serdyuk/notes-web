import React, { FC, Fragment, MouseEvent } from 'react';
import { Box, Drop } from 'grommet';
import { ConfirmDialog } from './ConfirmDialog';

interface NoteButtonsDialogsProps {
  isDeleteConfirmDialogOpen: boolean;
  isFavoritesTooltipShow: boolean;
  favoritesRefTarget: HTMLElement;
  favoritesList: string[];
  onDeleteNote: (e: MouseEvent) => void;
  onDeleteConfirmDialogClose: (e: MouseEvent) => void;
}

export const NoteButtonsDialogs: FC<NoteButtonsDialogsProps> = ({ 
  isDeleteConfirmDialogOpen,
  isFavoritesTooltipShow,
  favoritesRefTarget,
  favoritesList,
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