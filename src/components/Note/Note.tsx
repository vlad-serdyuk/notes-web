import React, { memo, useMemo, useCallback, FC, MouseEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { format, parseISO } from 'date-fns';
import { Avatar, Box, Text } from 'grommet';

import { Note as NoteModel } from 'gql/models';
import { TOGGLE_PRIVACY_NOTE } from 'gql/mutation';
import { useGetMeQuery } from 'common/hooks/queries';
import { NoteButtons } from './components/NoteButtons';
import * as Styled from './Note.styled';

interface INoteComponentProps extends RouteComponentProps {
  note: NoteModel;
}

const NoteComponent: FC<INoteComponentProps> = ({ note, history }) => {
  const { data: { me } } = useGetMeQuery();
  const [togglePrivacyMutation] = useMutation(TOGGLE_PRIVACY_NOTE);

  const isUserNote = useMemo(() => {
    if (!me) {
      return false;
    }
    
    return me.id === note.author.id;
  }, [note, me]);

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

  return (
    <Styled.NoteContainer onClick={onNoteClick}>
      <Avatar size="large" src={note.author.avatar} onClick={openAuthorNotes} />
      <Box width="100%">
        <Box direction="row" gap="small" align="center">
          <Styled.AuthorText onClick={openAuthorNotes}>{note.author.username}</Styled.AuthorText>
          <Styled.DateText size="small" color="grey">{format(parseISO(note.createdAt), 'MMM do yyyy')}</Styled.DateText>
          {isUserNote && <Styled.LockButton plain icon={<PrivacyIcon />} onClick={togglePrivacy} />}
        </Box>
        <Text size="large">{note.content}</Text>
        <Box border>
          <NoteButtons isUserNote={isUserNote} note={note} />
        </Box>
      </Box>
    </Styled.NoteContainer>
  );
};

export const Note = memo(withRouter(NoteComponent));