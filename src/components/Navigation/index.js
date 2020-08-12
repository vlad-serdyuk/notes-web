import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Text, Button } from 'grommet';

import { LinkText } from './Navigation.styled';

const NavigationComponent = ({ history }) => {

  const onCreateNoteClick = () => {
    history.push('/new');
  };

  return (
    <Nav width="small" pad="small">
      <LinkText to="/">
        <Text>Home</Text>
      </LinkText>
      <LinkText to="/trends">
        <Text>Trends</Text>
      </LinkText>
      <LinkText to="/profile">
        <Text>Profile</Text>
      </LinkText>
      <Button
        primary
        label="Create Note"
        onClick={onCreateNoteClick}
      />
    </Nav>
  );
};

export const Navigation = withRouter(NavigationComponent);