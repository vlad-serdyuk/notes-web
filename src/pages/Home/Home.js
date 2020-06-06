import React from 'react';
import { useQuery, gql } from '@apollo/client';

export const Home = () => {
  const { data, loading, error } = useQuery(GetNotesQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <div>
      {
        data.notesFeed.notes.map(note =>(
          <div key={note.id}>{note.author.username}</div>
        ))
      }
    </div>
  );
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
