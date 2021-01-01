import React, { memo, useMemo, useCallback, FC, MouseEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { Avatar, Box, Text } from 'grommet';

import { IGetMeData, Note as NoteModel } from 'gql/models';
import { GET_ME } from 'gql/query';
import { TOGGLE_PRIVACY_NOTE } from 'gql/mutation';
import { AuthorText } from 'common/components/AuthorText';
import { DateText } from 'common/components/DateText';
import { NoteButtons } from './components/NoteButtons';
import * as Styled from './FeedNote.styled';

interface IFeedNoteComponentProps extends RouteComponentProps {
  note: NoteModel;
}

const FeedNoteComponent: FC<IFeedNoteComponentProps> = ({ note, history }) => {
  const { data: { me } } = useQuery<IGetMeData>(GET_ME);
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
          <AuthorText author={note.author.username} onClick={openAuthorNotes} />
          <DateText date={note.createdAt} />
          {isUserNote && <Styled.LockButton plain icon={<PrivacyIcon />} onClick={togglePrivacy} />}
        </Box>
        <Text>{note.content}</Text>
        <NoteButtons isUserNote={isUserNote} note={note} />
      </Box>
    </Styled.NoteContainer>
  );
};

export const FeedNote = memo(withRouter(FeedNoteComponent));