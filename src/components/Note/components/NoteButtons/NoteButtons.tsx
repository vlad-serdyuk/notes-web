import React, { FC, Fragment, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Box, Drop, Text } from 'grommet';

import { GET_NOTES } from 'gql/query';
import { Note as NoteModel } from 'gql/models';
import { TOGGLE_FAVORITE_NOTE, DELETE_NOTE } from 'gql/mutation';
import { IconButton } from 'common/styled/IconButton';
import { ConfirmDialog } from './components/ConfirmDialog';
import * as Styled from './NoteButtons.styled';

interface NoteButtonsProps extends RouteComponentProps {
  isUserNote: boolean;
  note: NoteModel;
  meId?: string;
}

const NoteButtonsComponent: FC<NoteButtonsProps> = ({ isUserNote, note, meId, history }) => {
  const favoritesRef = useRef<HTMLElement>();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isTooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);
  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const isFavoritesTooltipShow = useMemo(() => {
    return isTooltipOpen && !!note.favoritedBy.length && favoritesRef.current;
  }, [note, isTooltipOpen, favoritesRef]);

  const isFavoriteByMe = useMemo(() => {
    if (!meId) {
      return false;
    }

    return (note.favoritedBy || []).find(({ id }) => meId === id);
  }, [note, meId]);

  const onDialogClose = (e: MouseEvent) => {
    e.stopPropagation();
    setDialogOpen(false);
  }

  const toggleFavorite = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteMutation({ variables: { id: note.id } });
  }, [toggleFavoriteMutation, note]);

  const editNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/edit/${note.id}`);
  }, [note, history]);

  const deleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setDialogOpen(true);
  }, [setDialogOpen]);

  const onDeleteNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    deleteNoteMutation({ variables: { id: note.id } });
  }, [deleteNoteMutation, note]);

  return (
    <Fragment>
      <Styled.ButtonContainer direction="row-responsive" gap="large">
        <Box direction="row" align="center">
          <IconButton 
            plain
            ref={favoritesRef}
            icon={<Styled.FavoriteIcon selected={isFavoriteByMe} />}
            onClick={toggleFavorite}
            onMouseOver={() => setTooltipOpen(true)}
            onMouseOut={() => setTooltipOpen(false)}
          />
          {(note.favoriteCount > 0) && <Text size="small" color={isFavoriteByMe ? 'brand' : null}>{note.favoriteCount}</Text>}
        </Box>
        <Box direction="row" align="center">
          <IconButton plain icon={<Styled.CommentIcon />} onClick={editNote} />
          {(note.comments.length > 0) && note.comments.length}
        </Box>
        {isUserNote && <IconButton plain icon={<Styled.EditIcon />} onClick={editNote} />}
        {isUserNote && <IconButton plain icon={<Styled.DeleteIcon />} onClick={deleteNote} />}
      </Styled.ButtonContainer>
      {isFavoritesTooltipShow
        && <Drop align={{ left: 'right' }} target={favoritesRef.current} plain>
            <Box
              margin="xsmall"
              pad="small"
              background="dark-3"
              round={{ size: 'xsmall' }}
            >
              {note.favoritedBy.map((item) => <span key={item.username}>{item.username}</span>)}
            </Box>
          </Drop>
          }
      {isDialogOpen
        && <ConfirmDialog onDeleteNote={onDeleteNote} onDialogClose={onDialogClose} />}
    </Fragment>
  );
};

export const NoteButtons = withRouter(NoteButtonsComponent);