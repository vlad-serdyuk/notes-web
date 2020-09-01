import React, { Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_USER_NOTES, GET_ME } from '/gql/query';
import { UPDATE_USER } from '/gql/mutation';
import { Profile } from '/components/Profile';
import { NotesTabs } from '/components/NotesTabs';
import { NoteFeed } from '/components/NoteFeed';

const ProfilePage = () => {
  const { data: { me } = {} } = useQuery(GET_ME);
  const { data: { user } = {}, loading, error } = useQuery(GET_USER_NOTES, { variables: { username: me.username } });
  
  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Fragment>
      <Profile 
        user={me}
        updateProfile={updateProfile}
      />
      <NotesTabs 
        notes={<NoteFeed notes={user.notes} />}
        favorites={<NoteFeed notes={user.favorites} />}
      />
    </Fragment>
  );
};

export default ProfilePage;