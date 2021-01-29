import styled from 'styled-components';
import { Button } from 'grommet';

export const StyledButton = styled(Button)`
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.global.colors['background-contrast'].light};
  }
`;