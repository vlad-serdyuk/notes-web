import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER_FAVORITES } from '/gql/query';
import { NoteFeed } from '/components/NoteFeed';

export const FavoritesPage = () => {
  const { data: meData } = useQuery(GET_ME);
  const { loading, error, data } = useQuery(GET_USER_FAVORITES, { variables: { username: meData.me.username } });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Fragment>
      {
        data.user.favorites.length
        ? <NoteFeed notes={data.user.favorites} />
        : <p>No notes yet</p>
      }
    </Fragment>
  );
};
