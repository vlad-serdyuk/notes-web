import React, { FC, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Box, Text } from 'grommet';

import { Comment as CommentModel } from 'gql/models';
import { useGetMeQuery } from 'common/hooks/queries';
import { AuthorText } from 'common/components/AuthorText';
import { DateText } from 'common/components/DateText';
import { CommentActionButtons } from 'components/CommentActionButtons';

import { CommentContainer } from './Comment.styled';

interface CommentProps {
  comment: CommentModel;
}

export const Comment: FC<CommentProps> = ({ comment }) => {
  const history = useHistory();
  const { data: { me } } = useGetMeQuery();

  const isUserComment = useMemo(() => {
    if (!me) {
      return false;
    }
    
    return me.id === comment.author.id;
  }, [comment, me]);

  const openAuthorPage = (e: MouseEvent) => {
    e.stopPropagation();
    history.push(`/notes/${comment.author.username}`);
  }

  return (
    <CommentContainer id={comment.id}>
      <Avatar size="large" src={comment.author.avatar} onClick={openAuthorPage} />
      <Box width="100%">
        <Box direction="row" gap="small" align="center">
          <AuthorText author={comment.author.username} onClick={openAuthorPage} />
          <DateText date={comment.createdAt} />
        </Box>
        <Text>{comment.content}</Text>
        <CommentActionButtons isUserItem={isUserComment} comment={comment} />
      </Box>
    </CommentContainer>
  );
};
