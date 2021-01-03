import React, { FC, memo } from 'react';
import { format, parseISO } from 'date-fns';
import { DateText as DateTextStyled } from './DateText.styled';

const DATE_FORMAT = 'MMM do yyyy';

interface DateTextProps {
  date: string;
}

const DateTextComponent: FC<DateTextProps> = ({ date }) => (
  <DateTextStyled>{format(parseISO(date), DATE_FORMAT)}</DateTextStyled>
);

export const DateText = memo(DateTextComponent);