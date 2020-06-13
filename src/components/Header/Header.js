import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Anchor, Box, Header as GrommetHeader } from 'grommet';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Header = () => {
  const { data } = useQuery(IS_LOGGED_IN);

  return (
    <GrommetHeader background="dark-1" pad="medium">
      <Box direction="row" gap="medium">
        <Link to="/"><Anchor label="Home" as="span" /></Link>
        <Link to="/my-notes"><Anchor label="My notes" as="span" /></Link>
      </Box>
      <Box direction="row" gap="medium">
        {
          data.isLoggedIn ? (
            <Anchor label="Log out" as="span" />
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

export default Header;