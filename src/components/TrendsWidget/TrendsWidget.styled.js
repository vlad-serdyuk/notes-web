import styled from 'styled-components';
import { Box, Heading } from 'grommet';

export const TrendsContainer = styled(Box).attrs({
  round: 'medium',
  gap: 'medium',
  border: { side: 'between' },
  pad: '16px 0'
})``;

export const TrendsHeader = styled(Heading).attrs({
  level: 3,
})`
  padding: 0 8px;
  margin: 0;
`;

export const TrendBlock = styled(Box).attrs({
  pad: '0 8px',
})`
  &:hover {
    cursor: pointer;
    background-color: rgba(120, 120, 120, 0.05);
  }
`;
