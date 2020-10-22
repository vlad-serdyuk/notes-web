import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Avatar, Box, Text } from 'grommet';

import { GET_TRENDS_NOTES } from '/gql/query';

const TrendsWidgetComponent = ({ history }) => {
  const { loading, error, data } = useQuery(GET_TRENDS_NOTES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Box>
      {
        data.trendsNotes.map((note) => {
          return <Text key={note.id}>{note.content}</Text>;
        })
      }
    </Box>
  );
};

TrendsWidgetComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const TrendsWidget = withRouter(TrendsWidgetComponent);