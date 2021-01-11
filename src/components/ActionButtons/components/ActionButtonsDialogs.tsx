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
      {isFavoritesTooltipShow
        && <Drop align={{ left: 'right' }} target={favoritesRefTarget} plain>
          <Box
            margin="xsmall"
            pad="small"
            background="dark-3"
            round={{ size: 'xsmall' }}
          >
            {favoritesList.map((favorite) => <span key={favorite}>{favorite}</span>)}
          </Box>
        </Drop>
      }
      {isDeleteConfirmDialogOpen
        && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={onDeleteConfirmDialogClose} />}
    </Fragment>
  );
}