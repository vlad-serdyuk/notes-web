import React, { Fragment } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { GET_USER_NOTES, GET_ME } from '/gql/query';
import { UPDATE_USER } from '/gql/mutation';
import { NoteFeed } from '/components/NoteFeed';
import { Profile } from '/components/Profile';

const NotesPage = ({ match }) => {
  const { loading, error, data } = useQuery(GET_USER_NOTES, { variables: { username: match.params.author } });
  const { data: { me } = {} } = useQuery(GET_ME);
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
      <NoteFeed notes={data.user.notes} />
    </Fragment>
  );
};

export default NotesPage;