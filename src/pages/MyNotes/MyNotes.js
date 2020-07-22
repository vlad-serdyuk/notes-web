import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER_NOTES } from '/gql/query';
import { NoteFeed } from '/components/NoteFeed';

const MyNotesPage = () => {
  const { data: meData } = useQuery(GET_ME);
  const { loading, error, data } = useQuery(GET_USER_NOTES, { variables: { username: meData.me.username } });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <h1>My notes</h1>
      <NoteFeed notes={data.user.notes} />
    </div>
  );
};

export default MyNotesPage;