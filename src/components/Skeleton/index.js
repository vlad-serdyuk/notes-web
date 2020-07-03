import React, { memo } from 'react';
import { StyledBox } from './Skeleton.styled';

const SkeletonComponent = () => (
  <StyledBox align="center" pad="small" />
);

export const Skeleton = memo(SkeletonComponent);