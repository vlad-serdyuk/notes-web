import styled, { css } from 'styled-components';
import { Box } from 'grommet';
import { Chat, Edit, Favorite, Trash } from 'grommet-icons';

export const ButtonContainer = styled(Box)`
  margin-left: -8px;
  margin-bottom: -8px;
`;

export const iconStyles = css`
  width: 20px;
  height: 20px;

  path {
    stroke-width: 1.5;
  }
`;

export const EditIcon = styled(Edit)`
  ${iconStyles}
`;

export const DeleteIcon = styled(Trash)`
  ${iconStyles}
`;