import React, { Fragment } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import { Anchor, Box, Button, Header as GrommetHeader } from 'grommet';

import { removeToken } from '../../services/SessionService';

const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const Header = (props) => {
  const { data, client } = useQuery(IS_LOGGED_IN);

  const onLogOut = () => {
    removeToken();
    client.resetStore();
    client.writeData({ data: { isLoggedIn: false } });
    props.history.push('/');
  };

  return (
    <GrommetHeader background="dark-1" pad="medium">
      <Box direction="row" gap="medium">
        <Link to="/"><Anchor label="Home" as="span" /></Link>
        <Link to="/my-notes"><Anchor label="My notes" as="span" /></Link>
      </Box>
      <Box direction="row" gap="medium">
        {
          data.isLoggedIn ? (
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