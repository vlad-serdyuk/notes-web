import React, { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { Avatar, Box, Button, Text } from 'grommet';

import { GET_ME } from '../../gql/query';
import { EditProfileDialog } from './EditProfileDialog';

export const Profile = ({ user, updateProfile }) => {
  const { data: { me } = {} } = useQuery(GET_ME);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openEditProfileDialog = () => setDialogOpen(true);
  const closeEditProfileDialog = () => setDialogOpen(false);

  const avatarLabel = useMemo(() => {
    return user.username ? user.username.charAt(0).toUpperCase() : '';
  }, [user]);

  const isUserMe = useMemo(() => {
    return user.id === me.id;
  }, [user, me]);

  const onUpdateProfile = useCallback((username) => {    
    updateProfile({ variables: { username } });
    closeEditProfileDialog();
  }, [updateProfile, closeEditProfileDialog]);

  return (
    <Box gap="small">
      <Box direction="row-responsive" justify="between" align="center">
        <Box height="48px" width="48px" align="center">
          <Avatar background="brand">{avatarLabel}</Avatar>
        </Box>
        {isUserMe && <Button
          label="Edit profile"
          onClick={openEditProfileDialog}
        />}
      </Box>
      <Text size="large">{user.username}</Text>
      <Text>{user.email}</Text>
      <Text size="small" color="grey">
        Joined {format(user.createdAt, 'MMM do YYYY')}
      </Text>
      {
      isDialogOpen && 
        <EditProfileDialog
          username={user.username}
          onUpdateProfile={onUpdateProfile}
          onDialogClose={closeEditProfileDialog}
        />
      }
    </Box>
  );
};