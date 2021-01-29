import React, { useMemo, Fragment, FC} from 'react';
import { useHistory } from 'react-router-dom';
import { Box } from 'grommet';

import { LOG_OUT } from 'gql/query';
import { useIsLoggedInQuery, useGetMeQuery } from 'common/hooks/queries';
import { AvatarDropButton } from './components/AvatarDropDown';
import { StyledHeader, LinkText, LinkWrapper } from './Header.styled';

export const Header: FC = () => {
  const history = useHistory();
  
  const { data: { isLoggedIn }, client } = useIsLoggedInQuery();
  const { data: { me } = {} } = useGetMeQuery();

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
          <LinkText to="/notes/favorites">Favorites</LinkText>
        </LinkWrapper>}
      </Box>
      <Box direction="row" gap="medium">
        {
          (isLoggedIn && me) ? (
            <AvatarDropButton
              email={me.email}
              initials={initials}
              username={me.username}
              openProfilePage={openProfilePage}
              onLogOut={onLogOut}
            />
          ) : (
            <Fragment>
              <LinkWrapper>
                <LinkText to="/sign-up">Sign up</LinkText>
              </LinkWrapper>
              <LinkWrapper>
                <LinkText to="/sign-in">Log In</LinkText>
              </LinkWrapper>
            </Fragment>
          )
        }
      </Box>
    </StyledHeader>
  );
};
