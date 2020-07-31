import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { Box } from 'grommet';

import { useIsLoggedInQuery } from '/common/queries/auth';
import { GET_ME, LOG_OUT } from '/gql/query';
import { AvatarDropButton } from './components/AvatarDropDown';
import { StyledHeader, LinkText, LinkWrapper } from './Header.styled';

const Header = ({ history }) => {
  const { data: { isLoggedIn }, client } = useIsLoggedInQuery();
  const { data: { me } = {} } = useQuery(GET_ME);

  const onLogOut = () => {
    client.query({ query: LOG_OUT }).then(() => {
      client.resetStore();
      client.writeData({ data: { isLoggedIn: false } });
      history.push('/');
    });
  };

  const openProfilePage = () => {
    history.push('/profile');
  };

  const initials = useMemo(() => {
    if (me) {
      return me.username.charAt(0).toUpperCase();
    }
    
    return '';
  }, [me]);

  return (
    <StyledHeader background="dark-1">
      <Box direction="row" gap="medium">
        <LinkWrapper>
          <LinkText to="/">Home</LinkText>
        </LinkWrapper>
        {me && <LinkWrapper>
          <LinkText to={`/notes/${me.username}`}>My notes</LinkText>
        </LinkWrapper>}
        {me && <LinkWrapper>
          <LinkText to="/favorites">Favorites</LinkText>
        </LinkWrapper>}
      </Box>
      <Box direction="row" gap="medium">
        {
          isLoggedIn ? (
            <AvatarDropButton
              email={me.email}
              initials={initials}
              username={me.username}
              openProfilePage={openProfilePage}
              onLogOut={onLogOut}
            />
          ) : (
            <LinkText to="/sign-in">Log In</LinkText>
          )
        }
      </Box>
    </StyledHeader>
  );
};

export default withRouter(Header);