import React, { FC, Fragment } from 'react';
import { useQuery } from '@apollo/client';

import { Note, IGetMeData } from 'gql/models';
import { GET_ME, GET_USER_FAVORITES } from 'gql/query';
import { NoteFeed } from 'components/NoteFeed';

interface FavoriesData {
  user: {
    favorites: Note[];
  }
}

interface FavoritesVars {
  username: string;
}

export const FavoritesPage: FC = () => {
  const { data: meData } = useQuery<IGetMeData>(GET_ME);
  const { loading, error, data } = useQuery<FavoriesData, FavoritesVars>(GET_USER_FAVORITES, { variables: { username: meData.me.username } });

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
