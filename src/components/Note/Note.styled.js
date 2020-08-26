import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Button, Box, Text } from 'grommet';
import { Edit, Favorite, Trash, Lock } from 'grommet-icons';

export const NoteContainer = styled(Box).attrs({
  align: 'center',
  direction: 'row-responsive',
  gap: 'small',
  pad: 'small',
  align: 'start',
  border: true,
})`
  border-top: none;

  &:hover {
    cursor: pointer;
    background-color: rgba(120, 120, 120, 0.05);
  }

  &:first-of-type {
    border-top: 1px solid rgba(0,0,0,0.33);
  }
`;

export const AuthorText = styled(Text)`
  &:hover {
    text-decoration: underline;
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

export const LockIcon = styled(Lock)`
  ${iconStyles}
`;