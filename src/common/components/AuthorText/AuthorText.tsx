import React, { FC, memo, MouseEvent } from 'react';
import { AuthorText as AuthorTextStyled } from './AuthorText.styled';

interface AuthorTextProps {
  author: string;
  onClick: (e: MouseEvent) => void;
}

const AuthorTextComponent: FC<AuthorTextProps> = ({ author, onClick }) => (
  <AuthorTextStyled onClick={onClick}>{author}</AuthorTextStyled>
);

export const AuthorText = memo(AuthorTextComponent);