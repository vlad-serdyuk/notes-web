import React, { FC, memo, useContext } from 'react';
import { GlobalContext } from 'common/contexts/globalContext';

import { StyledBox } from './Skeleton.styled';

const SkeletonComponent: FC = () => {
  const { theme } = useContext(GlobalContext);

  return <StyledBox />;
};

export const Skeleton = memo(SkeletonComponent);