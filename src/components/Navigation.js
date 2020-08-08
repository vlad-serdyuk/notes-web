import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Nav, Text, Button } from 'grommet';

const NavigationComponent = ({ history }) => {

  const onCreateNoteClick = () => {
    history.push('/new');
  };

  return (
    <Nav width="small" pad="small">
      <Link to="/">
        <Text>Home</Text>
      </Link>
      <Link to="/trends">
        <Text>Trends</Text>
      </Link>
      <Button
        primary
        label="Create Note"
        onClick={onCreateNoteClick}
      />
    </Nav>
  );
};

export const Navigation = withRouter(NavigationComponent);