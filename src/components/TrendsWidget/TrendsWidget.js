import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Box, Text } from 'grommet';

import { GET_TRENDS_NOTES } from '/gql/query';
import { TrendsContainer, TrendsHeader, TrendBlock } from './TrendsWidget.styled';

const TrendsWidgetComponent = ({ history }) => {
  const { loading, error, data } = useQuery(GET_TRENDS_NOTES);

  const openNote = useCallback((e) => {    
    history.push(`note/${e.target.id}`);
  }, [history]);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  return (
    <Box round="medium" border>
      <TrendsContainer>
        <TrendsHeader>Trends</TrendsHeader>
        {
          data.trendsNotes.map((note) => {
            return (
              <TrendBlock key={note.id} onClick={openNote}>
                <Text id={note.id}>{note.content}</Text>
                <Text color="brand" size="xsmall">{note.favoriteCount} favorites</Text>
              </TrendBlock>
            );
          })
        }
      </TrendsContainer>
    </Box>
  );
};

TrendsWidgetComponent.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
};

export const TrendsWidget = withRouter(TrendsWidgetComponent);