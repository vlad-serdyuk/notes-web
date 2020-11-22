import React, { useCallback, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Box, Text } from 'grommet';

import { GET_TRENDS_NOTES } from '../../gql/query';
import { Note } from '../../gql/models';
import { TrendsContainer, TrendsHeader, TrendBlock } from './TrendsWidget.styled';

const TrendsWidgetComponent: FC<RouteComponentProps> = ({ history }) => {
  const { loading, error, data } = useQuery(GET_TRENDS_NOTES);

  const openNote = useCallback((e) => {    
    history.push(`note/${e.target.id}`);
  }, [history]);

  const showMore = useCallback(() => {
    history.push('trends');
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
          data.trendsNotes.map((note: Note) => {
            return (
              <TrendBlock key={note.id} onClick={openNote}>
                <Text id={note.id}>{note.content}</Text>
                <Text color="brand" size="xsmall">{note.favoriteCount} favorites</Text>
              </TrendBlock>
            );
          })
        }
        <TrendBlock onClick={showMore}>
          <Text color="brand">Show more</Text>
        </TrendBlock>
      </TrendsContainer>
    </Box>
  );
};

export const TrendsWidget = withRouter(TrendsWidgetComponent);