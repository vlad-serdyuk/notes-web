import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Button, Box } from 'grommet';
import { Edit, Favorite, Trash } from 'grommet-icons';

export const NoteContainer = styled(Box).attrs({
  align: 'center',
  direction: 'row-responsive',
  gap: 'small',
  pad: 'small',
  align: 'start',
  border: true,
})`
  border-top: none;

  &:first-of-type {
    border-top: 1px solid rgba(0,0,0,0.33);
  }
`;

export const ButtonContainer = styled(Box)`
  margin-left: -8px;
  margin-bottom: -8px;
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
`;

export const DeleteIcon = styled(Trash)`
  ${iconStyles}
`;