import React, { FC, MouseEvent, memo, useCallback } from 'react';
import { IconButton } from 'common/components/IconButton';

import { EditIcon } from './EditActionButton.styled';

interface EditActionButtonProps {
  onEditItem: () => void;
}

const EditActionButtonComponent: FC<EditActionButtonProps> = ({ onEditItem }) => {
  const onEditNote = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    onEditItem();
  }, [onEditItem]);
  
  return (
    <IconButton plain icon={<EditIcon />} onClick={onEditNote} />
  );
};

export const EditActionButton = memo(EditActionButtonComponent);