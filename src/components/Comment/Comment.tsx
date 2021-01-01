import React, { FC, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Avatar, Box, Text } from 'grommet';

import { Comment as CommentModel } from 'gql/models'

interface CommentProps extends RouteComponentProps {
  comment: CommentModel;
}

const CommentComponent: FC<CommentProps> = ({ comment, history }) => {
  const openAuthorPage = (e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/notes/${comment.author.username}`);
  }

  return (
    <Fragment>
      <Avatar size="large" src={comment.author.avatar} onClick={openAuthorPage} />
      <Box width="100%">
        <Box direction="row" gap="small" align="center">
          <Styled.AuthorText onClick={openAuthorNotes}>{note.author.username}</Styled.AuthorText>
          <Styled.DateText size="small" color="grey">{format(note.createdAt, 'MMM do YYYY')}</Styled.DateText>
          {isUserNote && <Styled.LockButton plain icon={<PrivacyIcon />} onClick={togglePrivacy} />}
        </Box>
        <Text>{note.content}</Text>
        <NoteButtons isUserNote={isUserNote} note={note} />
      </Box>
    </Fragment>

  );
};

export const Comment = withRouter(CommentComponent);