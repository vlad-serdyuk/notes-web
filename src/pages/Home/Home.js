import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'grommet';

import { NoteFeed } from '/components/NoteFeed';
import { GET_NOTES } from '/gql/query';

const HomePage = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

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

export default HomePage;