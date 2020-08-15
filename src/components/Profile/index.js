import React, { useState, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { Avatar, Box, Button, Text } from 'grommet';

import { EditProfileDialog } from './EditProfileDialog';

export const Profile = ({ user, updateProfile }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openEditProfileDialog = () => setDialogOpen(true);
  const closeEditProfileDialog = () => setDialogOpen(false);

  const avatarLabel = useMemo(() => {
    return user.username ? user.username.charAt(0).toUpperCase() : '';
  }, [user]);

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
        <Button
          label="Edit profile"
          onClick={openEditProfileDialog}
        />
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