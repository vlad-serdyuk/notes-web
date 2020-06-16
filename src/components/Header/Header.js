import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Anchor, Box } from 'grommet';

import { useIsLoggedInQuery } from '../../common/queries/auth';
import { removeToken } from '../../services/SessionService';
import { AvatarDropButton } from './components/AvatarDropDown';
import { StyledHeader, AnchorLink, LinkWrapper } from './Header.styled';

const Header = (props) => {
  const { data: { isLoggedIn }, client } = useIsLoggedInQuery();

  const onLogOut = () => {
    removeToken();
    client.resetStore();
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push('/');
  };

  return (
    <StyledHeader background="dark-1">
      <Box direction="row" gap="medium">
        <LinkWrapper>
          <Link to="/"><AnchorLink label="Home" /></Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link to="/my-notes"><AnchorLink label="My notes" /></Link>
        </LinkWrapper>
        <LinkWrapper>
          <Link to="/favorites"><AnchorLink label="Favorites" /></Link>
        </LinkWrapper>
      </Box>
      <Box direction="row" gap="medium">
        {
          isLoggedIn ? (
            <AvatarDropButton onLogOut={onLogOut} />
          ) : (
            <Fragment>
              <Link to="/sign-in"><Anchor label="Log In" as="span" /></Link>
            </Fragment>
          )
        }
      </Box>
    </StyledHeader>
  );
};

export default withRouter(Header);