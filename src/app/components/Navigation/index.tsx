import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Nav, Button } from 'grommet';
import { useQuery, useSubscription } from '@apollo/client';

import { GET_ME } from 'gql/query';
import { IGetMeData } from 'gql/models';

import { LinkWrapper, LinkText } from './Navigation.styled';

export const Navigation: FC = () => {
  const history = useHistory();
  const { data: { me } = {} } = useQuery<IGetMeData>(GET_ME);

  const onCreateNoteClick = () => {
    history.push('/note/new');
  };

  return (
    <Nav width="small" pad="small">
      <LinkWrapper to="/">
        <LinkText>Home</LinkText>
      </LinkWrapper>
      <LinkWrapper to="/notes/trends">
        <LinkText>Trends</LinkText>
      </LinkWrapper>
      {me && <LinkWrapper to="/profile">
        <LinkText>Profile</LinkText>
      </LinkWrapper>}
      {me && <LinkWrapper to="/settings">
        <LinkText>Settings</LinkText>
      </LinkWrapper>}
      <Button
        primary
        label="Create Note"
        onClick={onCreateNoteClick}
      />
    </Nav>
  );
};