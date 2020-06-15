import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Anchor, Box, Button, Header as GrommetHeader } from 'grommet';

import { useIsLoggedInQuery } from '../../common/queries/auth';
import { removeToken } from '../../services/SessionService';
import { AnchorLink, LinkWrapper } from './Header.styled';

const Header = (props) => {
  const { data: { isLoggedIn }, client } = useIsLoggedInQuery();

  const onLogOut = () => {
    removeToken();
    client.resetStore();
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push('/');
  };

  return (
    <GrommetHeader background="dark-1" pad="medium">
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
            <Button label="Log out" onClick={onLogOut} />
          ) : (
            <Fragment>
              <Link to="/sign-in"><Anchor label="Sign In" as="span" /></Link>
              <Link to="/sign-up"><Anchor label="Sign Up" as="span" /></Link>
            </Fragment>
          )
        }
      </Box>
    </GrommetHeader>
  );
};

export default withRouter(Header);