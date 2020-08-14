import React from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_ME } from '/gql/query';
import { UPDATE_USER } from '/gql/mutation';
import { Profile } from '/components/Profile';

const ProfilePage = () => {
  const { data: { me } = {} } = useQuery(GET_ME);
  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  return (
    <Profile 
      user={me}
      updateProfile={updateProfile}
    />
  );
};

export default ProfilePage;