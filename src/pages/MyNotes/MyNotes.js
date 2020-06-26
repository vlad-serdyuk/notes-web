import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MY_NOTES } from '/gql/query';
import { NoteFeed } from '/components/NoteFeed';

const MyNotesPage = () => {
  const { loading, error, data } = useQuery(GET_MY_NOTES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <h1>My notes</h1>
      <NoteFeed notes={data.notes} />
    </div>
  );
};

export default MyNotesPage;