import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_TRENDS_NOTES } from '../../gql/query';
import { NoteFeed } from '../../components/NoteFeed';

export const TrendsPage = () => {
  const { loading, error, data } = useQuery(GET_TRENDS_NOTES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return <NoteFeed notes={data.trendsNotes} />;
};
