import styled from 'styled-components';
import { Anchor, Box, Header } from 'grommet';

export const StyledHeader = styled(Header)`
  height: 52px;
  padding: 0 16px;
`;

export const AnchorLink = styled(Anchor)`
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