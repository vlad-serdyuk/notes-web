import styled from 'styled-components';
import { rgba } from 'polished';
import { Box, Heading } from 'grommet';

export const TrendsContainer = styled(Box).attrs({
  round: 'medium',
  border: true,
  pad: 'small',
  gap: 'small',
})``;

export const TrendsHeader = styled(Heading).attrs({
  level: 3,
})`
  margin: 0;

  &:hover {
    background-color: rgba(120, 120, 120, 0.05);
  }
`;
