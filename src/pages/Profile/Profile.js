import React from 'react';
import { format } from 'date-fns';
import { useQuery } from '@apollo/client';
import { Avatar, Box, Text } from 'grommet';

import { GET_ME } from '/gql/query';

const ProfilePage = () => {
  const { data: { me } = {} } = useQuery(GET_ME);

  return (
    <Box gap="small">
      <Box height="40px" width="40px" align="center">
        <Avatar background="brand">{me.username.charAt(0).toUpperCase()}</Avatar>
      </Box>
      <Text size="large">{me.username}</Text>
      <Text>{me.email}</Text>
      <Text size="small" color="grey">
        Joined {format(me.createdAt, 'MMM do YYYY')}
      </Text>
    </Box>
  );
};

export default ProfilePage;