import React, { memo, FC } from 'react';
import { StyledBox } from './Skeleton.styled';

const SkeletonComponent: FC = () => (
  <StyledBox align="center" pad="small" />
);

export const Skeleton = memo(SkeletonComponent);