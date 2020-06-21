import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Box, Header } from 'grommet';

export const StyledHeader = styled(Header)`
  height: 52px;
  padding: 0 16px;
`;

export const LinkText = styled(Link)`
  color: #6FFFB0;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: none;
    font-weight: 700;
  }
`;

export const LinkWrapper = styled(Box).attrs({
  width: '65px',
  justify: 'center',
  align: 'center',
})``;