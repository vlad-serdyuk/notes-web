import React, { memo, useMemo, useCallback, FC, MouseEvent, Ref } from 'react'
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { Avatar, Box, Text } from 'grommet';

import { Note as NoteModel } from 'gql/models';
import { TOGGLE_PRIVACY_NOTE } from 'gql/mutation';
import { AuthorText } from 'common/components/AuthorText';
import { DateText } from 'common/components/DateText';
import { useGetMeQuery } from 'common/hooks/queries';
import { NoteActionButtons } from 'common/components/NoteActionButtons';
import * as Styled from './FeedNote.styled';

interface IFeedNoteComponentProps {
  note: NoteModel;
  innerRef: Ref<any>;
}

const FeedNoteComponent: FC<IFeedNoteComponentProps> = ({ note, innerRef }) => {
  const history = useHistory();
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
    history.push(`/user/${note.author.username}`);
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
    <Styled.NoteContainer onClick={onNoteClick} ref={innerRef}>
      <Avatar size="large" src={note.author.avatar} onClick={openAuthorNotes} />
      <Box width="100%">
        <Box direction="row" gap="small" align="center">
          <AuthorText author={note.author.username} onClick={openAuthorNotes} />
          <DateText date={note.createdAt} />
          {isUserNote && <Styled.LockButton plain icon={<PrivacyIcon />} onClick={togglePrivacy} />}
        </Box>
        <Text>{note.content}</Text>
        <NoteActionButtons isUserItem={isUserNote} note={note} />
      </Box>
    </Styled.NoteContainer>
  );
};

export const FeedNote = memo(FeedNoteComponent);