import React, { memo, useMemo, useState, useCallback, useRef, FC, MouseEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { Avatar, Box, Text, Drop } from 'grommet';

import { IGetMeData } from 'gql/models';
import { GET_NOTES, GET_ME } from 'gql/query';
import { TOGGLE_FAVORITE_NOTE, TOGGLE_PRIVACY_NOTE, DELETE_NOTE } from 'gql/mutation';
import { ConfirmDialog } from './components/ConfirmDialog';
import * as Styled from './Note.styled';

interface INoteComponentProps extends RouteComponentProps {
  note: any;
}

const NoteComponent: FC<INoteComponentProps> = ({ note, history }) => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isTooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const favoritesRef = useRef<HTMLElement>();

  const { data: { me } } = useQuery<IGetMeData>(GET_ME);
  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_NOTE);
  const [togglePrivacyMutation] = useMutation(TOGGLE_PRIVACY_NOTE);

  const [deleteNoteMutation] = useMutation(DELETE_NOTE, {
    refetchQueries: [{ query: GET_NOTES }],
  });

  const isUserNote = useMemo(() => {
    if (!me) {
      return false;
    }
    
    return me.id === note.author.id;
  }, [note, me]);
  
  const isUserFavorite = useMemo(() => {
    if (!me) {
      return false;
    }

    return (note.favoritedBy || []).find(({ id }) => me.id === id);
  }, [note, me]);

  const isFavoritesTooltipShow = useMemo(() => {
    return isTooltipOpen && !!note.favoritedBy.length && favoritesRef.current;
  }, [note, isTooltipOpen, favoritesRef]);

  const onDialogClose = (e: MouseEvent) => {
    e.stopPropagation();
    setDialogOpen(false);
  }

  const openAuthorNotes = (e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/notes/${note.author.username}`);
  }

  const onNoteClick = useCallback(() => {    
    history.push(`/note/${note.id}`);
  }, [note, history]);

  const togglePrivacy = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    togglePrivacyMutation({ variables: { id: note.id, private: !note.private } });
  }, [togglePrivacyMutation, note]);

  const PrivacyIcon = useMemo(() => {
    return note.private ? Styled.LockIcon : Styled.UnlockIcon;
  }, [note]);

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
    <Styled.NoteContainer onClick={onNoteClick}>
      <Avatar size="large" src={note.author.avatar} onClick={openAuthorNotes} />
      <Box width="100%">
        <Box direction="row" gap="small" align="center">
          <Styled.AuthorText onClick={openAuthorNotes}>{note.author.username}</Styled.AuthorText>
          <Styled.DateText size="small" color="grey">{format(note.createdAt, 'MMM do YYYY')}</Styled.DateText>
          {isUserNote && <Styled.LockButton plain icon={<PrivacyIcon />} onClick={togglePrivacy} />}
        </Box>
        <Text>{note.content}</Text>
        <Styled.ButtonContainer direction="row-responsive" gap="large">
          <Box direction="row" align="center">
            <Styled.IconButton 
              plain
              ref={favoritesRef}
              icon={<Styled.FavoriteIcon selected={isUserFavorite} />}
              onClick={toggleFavorite}
              onMouseOver={() => setTooltipOpen(true)}
              onMouseOut={() => setTooltipOpen(false)}
            />
            {(note.favoriteCount > 0) && <Text size="small" color={isUserFavorite ? 'brand' : null}>{note.favoriteCount}</Text>}
          </Box>
          {isUserNote && <Styled.IconButton plain icon={<Styled.EditIcon />} onClick={editNote} />}
          {isUserNote && <Styled.IconButton plain icon={<Styled.DeleteIcon />} onClick={deleteNote} />}
        </Styled.ButtonContainer>
      </Box>
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
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));