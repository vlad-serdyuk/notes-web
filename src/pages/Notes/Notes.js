import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_NOTES } from '/gql/query';
import { NoteFeed } from '/components/NoteFeed';
import { Profile } from '/components/Profile';

const NotesPage = ({ match }) => {
  const { loading, error, data } = useQuery(GET_USER_NOTES, { variables: { username: match.params.author } });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Fragment>
      <Profile />
      <NoteFeed notes={data.user.notes} />
    </Fragment>
  );
};

export default NotesPage;