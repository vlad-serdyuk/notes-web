import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Button } from 'grommet';

import { LinkWrapper, LinkText } from './Navigation.styled';

const NavigationComponent = ({ history }) => {

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
      <LinkWrapper to="/profile">
        <LinkText>Profile</LinkText>
      </LinkWrapper>
      <Button
        primary
        label="Create Note"
        onClick={onCreateNoteClick}
      />
    </Nav>
  );
};

export const Navigation = withRouter(NavigationComponent);