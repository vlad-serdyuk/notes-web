import React, { FC, memo } from 'react';
import { formatDate } from 'app/utils/date';
import { DateText as DateTextStyled } from './DateText.styled';

interface DateTextProps {
  date: string;
}

const DateTextComponent: FC<DateTextProps> = ({ date }) => (
  <DateTextStyled>{formatDate(date)}</DateTextStyled>
);

export const DateText = memo(DateTextComponent);