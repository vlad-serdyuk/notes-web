import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { NoteFeed } from '../../components/NoteFeed';

const Home = () => {
 
  const { data, loading, error } = useQuery(GetNotesQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return <NoteFeed notes={data.notesFeed.notes} />;
};

const GetNotesQuery = gql`
  query NoteFeed($cursor: String) {
    notesFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        favoriteCount
        author {
          id
          username
          avatar
        }
      }
    }
  }
`;

export default Home;