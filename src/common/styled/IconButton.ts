import styled from 'styled-components';
import { rgba } from 'polished';
import { Button } from 'grommet';

export const IconButton = styled(Button)`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => rgba(theme.global.colors.brand, 0.1)};

    svg {
      stroke: ${({ theme }) => theme.global.colors.brand};
    }
  }
`;