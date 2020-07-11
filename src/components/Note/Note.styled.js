import styled from 'styled-components';
import { Edit, Favorite } from 'grommet-icons';

export const EditIcon = styled(Edit)`
  &:hover {
    stroke: ${({ theme }) => theme.global.colors.brand};
  }
`;

export const FavoriteIcon = styled(Favorite)`
  &:hover {
    stroke: ${({ theme }) => theme.global.colors.brand};
  }
`;