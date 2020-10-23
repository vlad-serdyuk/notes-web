import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Avatar, Box, Heading, Text } from 'grommet';

import { GET_TRENDS_NOTES } from '/gql/query';
import { TrendsContainer, TrendsHeader, TrendBlock } from './TrendsWidget.styled';

const TrendsWidgetComponent = ({ history }) => {
  const { loading, error, data } = useQuery(GET_TRENDS_NOTES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <TrendsContainer>
      <TrendsHeader>Trends</TrendsHeader>
      {
        data.trendsNotes.map((note) => {
          return (
            <TrendBlock key={note.id}>
              <Text>{note.content}</Text>
            </TrendBlock>
          );
        })
      }
    </TrendsContainer>
  );
};

TrendsWidgetComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const TrendsWidget = withRouter(TrendsWidgetComponent);