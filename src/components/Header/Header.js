import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';
import { Box } from 'grommet';

import { useIsLoggedInQuery } from '/common/queries/auth';
import { GET_ME, LOG_OUT } from '/gql/query';
import { AvatarDropButton } from './components/AvatarDropDown';
import { StyledHeader, LinkText, LinkWrapper } from './Header.styled';

const Header = (props) => {
  const { data: { isLoggedIn }, client } = useIsLoggedInQuery();
  const { data: meData } = useQuery(GET_ME);

  const onLogOut = () => {
    client.query({ query: LOG_OUT }).then(() => {
      client.resetStore();
      client.writeData({ data: { isLoggedIn: false } });
      props.history.push('/');
    });
  };

  const name = useMemo(() => {
    if (meData && meData.me) {
      return meData.me.username.charAt(0).toUpperCase();
    }
    
    return '';
  }, [meData]);

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
            <AvatarDropButton onLogOut={onLogOut} name={name} />
          ) : (
            <LinkText to="/sign-in">Log In</LinkText>
          )
        }
      </Box>
    </StyledHeader>
  );
};

export default withRouter(Header);