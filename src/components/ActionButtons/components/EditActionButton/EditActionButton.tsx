import React, { FC, MouseEvent, memo } from 'react';
import { IconButton } from 'common/components/IconButton';

import { EditIcon } from './EditActionButton.styled';

interface EditActionButtonProps {
  onEditNote: (e: MouseEvent) => void;
}

const EditActionButtonComponent: FC<EditActionButtonProps> = ({ onEditNote }) => (
  <IconButton plain icon={<EditIcon />} onClick={onEditNote} />
);

export const EditActionButton = memo(EditActionButtonComponent);