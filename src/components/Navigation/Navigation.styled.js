import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { rgba } from 'polished';
import { Box } from 'grommet';

export const LinkText = styled(Link)`
  color: ${({ theme }) => theme.global.colors.brand};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => rgba(theme.global.colors.brand, 0.1)};
    text-decoration: none;
  }
`;

export const LinkWrapper = styled(Box).attrs({
  width: '65px',
  justify: 'center',
  align: 'center',
})``;