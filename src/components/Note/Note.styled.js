import styled from 'styled-components';
import { rgba } from 'polished';
import { Button, Box } from 'grommet';
import { Edit, Favorite, Trash } from 'grommet-icons';

export const ButtonContainer = styled(Box)`
  margin-left: -8px;
`;

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

export const EditIcon = styled(Edit)`
  width: 20px;
  height: 20px;

  path {
    stroke-width: 1.5;
  }
`;

export const FavoriteIcon = styled(Favorite)`
  width: 20px;
  height: 20px;

  path {
    stroke-width: 1.5;
  }
`;

export const DeleteIcon = styled(Trash)`
  width: 20px;
  height: 20px;

  path {
    stroke-width: 1.5;
  }
`;