import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { rgba } from 'polished';
import { Text } from 'grommet';

export const LinkWrapper = styled(Link)`
  color: ${({ theme }) => theme.global.colors.brand};
  text-decoration: none;
  font-weight: 600;
  padding: 8px;
  border-radius: 18px;

  &:hover {
    background-color: ${({ theme }) => rgba(theme.global.colors.brand, 0.1)};
    text-decoration: none;
  }
`;

export const LinkText = styled(Text)`
  margin-left: 8px;
`;