import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from '@apollo/client'; 
import { Box } from 'grommet';

import { useIsLoggedInQuery } from '../../common/queries/auth';
import { AvatarDropButton } from './components/AvatarDropDown';
import { StyledHeader, LinkText, LinkWrapper } from './Header.styled';

const Header = (props) => {
  const { data: { isLoggedIn }, client } = useIsLoggedInQuery();

  const onLogOut = () => {
    client.query({ query: LogOutQuery }).then(() => {
      client.resetStore();
      client.writeData({ data: { isLoggedIn: false } });
      props.history.push('/');
    });
  };

  return (
    <StyledHeader background="dark-1">
      <Box direction="row" gap="medium">
        <LinkWrapper>
          <LinkText to="/">Home</LinkText>
        </LinkWrapper>
        <LinkWrapper>
          <LinkText to="/my-notes">My notes</LinkText>
        </LinkWrapper>
        <LinkWrapper>
          <LinkText to="/favorites">Favorites</LinkText>
        </LinkWrapper>
      </Box>
      <Box direction="row" gap="medium">
        {
          isLoggedIn ? (
            <AvatarDropButton onLogOut={onLogOut} />
          ) : (
            <Fragment>
              <LinkText to="/sign-in">Log In</LinkText>
            </Fragment>
          )
        }
      </Box>
    </StyledHeader>
  );
};

const LogOutQuery = gql`
  query SignOut {
    signOut 
  }
`;

export default withRouter(Header);