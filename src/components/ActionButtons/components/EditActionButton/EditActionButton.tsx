import React, { FC, Fragment, MouseEvent, memo } from 'react';
import { IconButton } from 'common/components/IconButton';

import { EditIcon } from './EditActionButton.styled';

interface EditActionButtonProps {
  isButtonShown: boolean;
  editNote: (e: MouseEvent) => void;
}

const EditActionButtonComponent: FC<EditActionButtonProps> = ({ isButtonShown, editNote }) => (
  <Fragment>
    {isButtonShown && <IconButton plain icon={<EditIcon />} onClick={editNote} />}
  </Fragment>
);

export const EditActionButton = memo(EditActionButtonComponent);