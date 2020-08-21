import React, { useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/client';

import { GET_USER_NOTES, GET_ME } from '/gql/query';
import { UPDATE_USER } from '/gql/mutation';
import { NoteFeed } from '/components/NoteFeed';
import { Profile } from '/components/Profile';
import { NotesTabs } from '/components/NotesTabs';

const NotesPage = ({ match }) => {
  const { loading, error, data } = useQuery(GET_USER_NOTES, { variables: { username: match.params.author } });
  const [updateProfile] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_ME }],
  });

  const user = useMemo(() => {
    if (!data) {
      return {};
    }

    const { user } = data;
    
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
  }, [data]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Fragment>
      <Profile 
        user={user}
        updateProfile={updateProfile}
      />
      <NotesTabs 
        notes={<NoteFeed notes={data.user.notes} />}
        favorites={<NoteFeed notes={data.user.favorites} />}
      />
    </Fragment>
  );
};

NotesPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
};

export default NotesPage;