import React, { FC, MouseEvent, memo, useCallback } from 'react';
import { IconButton } from 'common/components/IconButton';

import { EditIcon } from './EditActionButton.styled';

interface EditActionButtonProps {
  onEditItem: (e: MouseEvent) => void;
}

const EditActionButtonComponent: FC<EditActionButtonProps> = ({ onEditItem }) => {
  const onEdit = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onEditItem();
  }, [onEditItem]);
  
  return (
    <IconButton plain icon={<EditIcon />} onClick={onEdit} />
  );
};

export const EditActionButton = memo(EditActionButtonComponent);