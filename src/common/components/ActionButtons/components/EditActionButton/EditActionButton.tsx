import React, { FC, MouseEvent, memo } from 'react';
import { IconButton } from 'common/components/IconButton';

import { EditIcon } from './EditActionButton.styled';

interface EditActionButtonProps {
  onEditItem: (e: MouseEvent) => void;
}

const EditActionButtonComponent: FC<EditActionButtonProps> = ({ onEditItem }) => (
  <IconButton plain icon={<EditIcon />} onClick={onEditItem} />
);

export const EditActionButton = memo(EditActionButtonComponent);