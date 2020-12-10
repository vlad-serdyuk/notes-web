import React, { FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Nav, Button } from 'grommet';
import { useQuery } from '@apollo/client';

import { GET_ME } from '../../gql/query';
import { IGetMeData } from '../../gql/models';

import { LinkWrapper, LinkText } from './Navigation.styled';

const NavigationComponent: FC<RouteComponentProps> = ({ history }) => {
  const { data: { me } = {} } = useQuery<IGetMeData>(GET_ME);

  const onCreateNoteClick = () => {
    history.push('/new');
  };

  return (
    <Nav width="small" pad="small">
      <LinkWrapper to="/">
        <LinkText>Home</LinkText>
      </LinkWrapper>
      <LinkWrapper to="/trends">
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

export const Navigation = withRouter(NavigationComponent);