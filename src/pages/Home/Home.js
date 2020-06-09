import React, { Fragment } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Button } from 'grommet';

import { NoteFeed } from '../../components/NoteFeed';

const HomePage = () => {
  const { data, loading, error, fetchMore } = useQuery(GetNotesQuery);

  const onLoadMoreClick = () => {    
    fetchMore({
      variables: {
        cursor: data.notesFeed.cursor,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        return {
          notesFeed: {
            cursor: fetchMoreResult.notesFeed.cursor,
            hasNextPage: fetchMoreResult.notesFeed.hasNextPage,
            notes: [
              ...prevResult.notesFeed.notes,
              ...fetchMoreResult.notesFeed.notes,
            ],
            __typename: 'notesFeed',
          }
        };
      },
    });
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error!</p>;
  }

  return (
    <Fragment>
      <NoteFeed notes={data.notesFeed.notes} />
      {
        data.notesFeed.hasNextButton 
          && (
          <Button
            primary
            pad="medium"
            label="Load more"
            onClick={onLoadMoreClick}
          />
          )
      }
    </Fragment>
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

export default HomePage;