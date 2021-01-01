import React, { FC, memo } from 'react';
import { format } from 'date-fns';
import { DateText as DateTextStyled } from './DateText.styled';

const DATE_FORMAT = 'MMM do YYYY';

interface DateTextProps {
  date: string;
}

const DateTextComponent: FC<DateTextProps> = ({ date }) => (
  <DateTextStyled>{format(date, DATE_FORMAT)}</DateTextStyled>
);

export const DateText = memo(DateTextComponent);