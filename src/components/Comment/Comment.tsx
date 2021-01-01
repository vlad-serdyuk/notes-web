import React, { FC, Fragment } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Avatar, Box, Text } from 'grommet';

import { AuthorText } from 'common/components/AuthorText';
import { DateText } from 'common/components/DateText';
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
          <AuthorText onClick={openAuthorPage} author={comment.author.username} />
          <DateText date={comment.createdAt} />
        </Box>
        <Text>{comment.content}</Text>
      </Box>
    </Fragment>

  );
};

export const Comment = withRouter(CommentComponent);