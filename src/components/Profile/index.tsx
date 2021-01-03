import React, { useState, useCallback, useMemo, FC } from 'react';
import { format } from 'date-fns';
import { Avatar, Box, Button, Text } from 'grommet';

import { useGetMeQuery } from 'common/hooks/queries';
import { EditProfileDialog } from './EditProfileDialog/index';

interface ProfileProps {
  user: any;
  updateProfile: ({ variables: { username } }: { variables: { username: string } }) => void;
}

export const Profile: FC<ProfileProps> = ({ user, updateProfile }) => {
  const { data: { me } = {} } = useGetMeQuery();
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

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
        Joined {format(user.createdAt, 'MMM do yyyy')}
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