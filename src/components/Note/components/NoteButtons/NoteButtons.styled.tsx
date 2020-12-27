import styled, { css } from 'styled-components';
import { Box } from 'grommet';
import { Chat, Edit, Favorite, Trash } from 'grommet-icons';

export const ButtonContainer = styled(Box)`
  margin-left: -8px;
  margin-bottom: -8px;
`;

const iconStyles = css`
  width: 20px;
  height: 20px;

  path {
    stroke-width: 1.5;
  }
`;

export const EditIcon = styled(Edit)`
  ${iconStyles}
`;

export const FavoriteIcon = styled(Favorite)`
  ${iconStyles}
  && {
    path {
      fill: ${({ theme, selected }) => selected ? theme.global.colors.brand : 'none'};
      stroke: ${({ theme, selected }) => selected ? theme.global.colors.brand : 'inherit'};
    }
  }
`;

export const DeleteIcon = styled(Trash)`
  ${iconStyles}
`;

export const CommentIcon = styled(Chat)`
  ${iconStyles}
`;