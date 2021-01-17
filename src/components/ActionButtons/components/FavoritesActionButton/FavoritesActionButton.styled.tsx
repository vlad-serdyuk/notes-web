import styled from 'styled-components';
import { Favorite } from 'grommet-icons';
import { iconStyles } from 'components/ActionButtons/ActionButtons.styled';

export const FavoriteIcon = styled(Favorite)`
  ${iconStyles}
  && {
    path {
      fill: ${({ theme, selected }) => selected ? theme.global.colors.brand : 'none'};
      stroke: ${({ theme, selected }) => selected ? theme.global.colors.brand : 'inherit'};
    }
  }
`;