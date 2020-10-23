import styled from 'styled-components';
import { rgba } from 'polished';
import { Box, Heading } from 'grommet';

export const TrendsContainer = styled(Box).attrs({
  round: 'medium',
  gap: 'medium',
  border: true,
  pad: '16px 0'
})``;

export const TrendsHeader = styled(Heading).attrs({
  level: 3,
})`
  margin: 0 8px;
`;

export const TrendBlock = styled(Box).attrs({
  border: 'bottom',
  pad: '0 8px',
})`
  &:hover {
    cursor: pointer;
    background-color: rgba(120, 120, 120, 0.05);
  }
`;
