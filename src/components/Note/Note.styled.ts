import styled, { css } from 'styled-components';
import { Box, Text } from 'grommet';
import { Lock, Unlock } from 'grommet-icons';
import { IconButton } from 'common/styled/IconButton';

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

export const DateText = styled(Text)`
  margin-right: auto;
`;

const lockIconStyles = css`
  width: 16px;
  height: 16px;
`;

export const LockButton = styled(IconButton)`
  width: 32px;
  height: 32px;
`;

export const LockIcon = styled(Lock)`
  ${lockIconStyles}
`;

export const UnlockIcon = styled(Unlock)`
  ${lockIconStyles}
`;
