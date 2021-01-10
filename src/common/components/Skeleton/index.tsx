import React, { FC, memo } from 'react';

import { StyledBox } from './Skeleton.styled';

const SkeletonComponent: FC = () => {
  return <StyledBox />;
};

export const Skeleton = memo(SkeletonComponent);