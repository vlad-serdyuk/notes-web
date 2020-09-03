import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Nav, Button } from 'grommet';
import { useQuery } from '@apollo/client';
import { GET_ME } from '/gql/query';

import { LinkWrapper, LinkText } from './Navigation.styled';

const NavigationComponent = ({ history }) => {
  const { data: { me } = {} } = useQuery(GET_ME);

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

NavigationComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const Navigation = withRouter(NavigationComponent);