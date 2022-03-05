import { format } from 'date-fns';

export const dateFormat = (
  date: Date,
  formating: string | undefined = 'Y-MM-dd'
) => {
  return format(date, formating);
};

export const stringToDate = (date: string) => {
  const [year, month, day] = date.split('-');
  return new Date(Number(year), parseInt(month) - 1, Number(day));
};
