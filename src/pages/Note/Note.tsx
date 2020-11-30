import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Note } from '../../components/Note';
import { GET_NOTE } from '../../gql/query';

export const NotePage: FC<RouteComponentProps> = ({ match: { params: { id } } }) => {
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error note not found</p>;
  }

  return <Note note={data.note} />;
};
