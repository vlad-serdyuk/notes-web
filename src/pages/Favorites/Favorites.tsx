import React, { FC, Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER_FAVORITES } from '../../gql/query';
import { Note, Me as MeModel } from '../../gql/models';
import { NoteFeed } from '../../components/NoteFeed';

interface MeData {
  me: MeModel;
}

interface FavoriesData {
  user: {
    favorites: Note[];
  }
}

interface FavoritesVars {
  username: string;
}

export const FavoritesPage: FC = () => {
  const { data: meData } = useQuery<MeData>(GET_ME);
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
