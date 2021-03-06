import React, { FC, Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'grommet';

import { GET_NOTES } from 'gql/query';
import { NotesFeed } from 'common/components/NotesFeed';
import { SearchBar } from 'common/components/SearchBar/SearchBar';

export const HomePage: FC = () => {
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
      <NotesFeed notes={data.notesFeed.notes}>
        <SearchBar />
      </NotesFeed>
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
