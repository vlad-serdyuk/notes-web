import { format, parseISO } from 'date-fns';

const DATE_FORMAT = 'MMM do yyyy';

export const formatDate: (date: string) => string = (date) => format(parseISO(date), DATE_FORMAT);