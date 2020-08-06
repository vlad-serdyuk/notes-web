import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { useQuery, useMutation } from '@apollo/client';
import { Avatar, Box, Button, Text } from 'grommet';

import { GET_ME } from '/gql/query';
import { UPDATE_USER } from '/gql/mutation';
import { EditProfileDialog } from './EditProfileDialog';

export const Profile = () => {
  const { data: { me } = {} } = useQuery(GET_ME);
  const [updateProfileMutation] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openEditProfileDialog = () => setDialogOpen(true);
  const closeEditProfileDialog = () => setDialogOpen(false);

  const updateProfile = useCallback((username) => {    
    updateProfileMutation({ variables: { username } });
    closeEditProfileDialog();
  }, [updateProfileMutation, closeEditProfileDialog]);

  return (
    <Box gap="small">
      <Box direction="row-responsive" justify="between" align="center">
        <Box height="48px" width="48px" align="center">
          <Avatar background="brand">{me.username.charAt(0).toUpperCase()}</Avatar>
        </Box>
        <Button
          label="Edit profile"
          onClick={openEditProfileDialog}
        />
      </Box>
      <Text size="large">{me.username}</Text>
      <Text>{me.email}</Text>
      <Text size="small" color="grey">
        Joined {format(me.createdAt, 'MMM do YYYY')}
      </Text>
      {
      isDialogOpen && 
        <EditProfileDialog
          username={me.username}
          onUpdateProfile={updateProfile}
          onDialogClose={closeEditProfileDialog}
        />
      }
    </Box>
  );
};