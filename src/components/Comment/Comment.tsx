import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Avatar, Box, Text } from 'grommet';

import { Comment as CommentModel } from 'gql/models';
import { AuthorText } from 'common/components/AuthorText';
import { DateText } from 'common/components/DateText';
import { NoteButtons } from 'components/NoteButtons';

import { CommentContainer } from './Comment.styled';

interface CommentProps extends RouteComponentProps {
  comment: CommentModel;
}

const CommentComponent: FC<CommentProps> = ({ comment, history }) => {
  const openAuthorPage = (e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/notes/${comment.author.username}`);
  }

  return (
    <CommentContainer>
      <Avatar size="large" src={comment.author.avatar} onClick={openAuthorPage} />
      <Box width="100%">
        <Box direction="row" gap="small" align="center">
          <AuthorText author={comment.author.username} onClick={openAuthorPage} />
          <DateText date={comment.createdAt} />
        </Box>
        <Text>{comment.content}</Text>
      </Box>
    </CommentContainer>
  );
};

export const Comment = withRouter(CommentComponent);