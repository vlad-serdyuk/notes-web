import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import { Note } from '../../components/Note';
import { GET_NOTE } from '../../gql/query';

export const NotePage = ({ match: { params: { id } } }) => {
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Error note not found</p>;
  }

  return <Note note={data.note} />;
};

NotePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }),
};
