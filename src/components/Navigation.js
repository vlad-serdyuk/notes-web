import React from 'react';
import { withRouter } from 'react-router-dom';
import { Nav, Text, Button } from 'grommet';

const NavigationComponent = ({ history }) => {

  const onCreateNoteClick = () => {
    history.push('/new');
  };

  return (
    <Nav width="small" pad="small">
      <Text>Your Notes:</Text>
      <Button
        primary
        label="Create Note"
        onClick={onCreateNoteClick}
      />
    </Nav>
  );
};

export const Navigation = withRouter(NavigationComponent);