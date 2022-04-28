import {format} from 'date-fns';

export const liveDataDateFormat = (szDate: string, szTime: string) => {
    const date = [szDate.slice(0, 4), szDate.slice(4, 6), szDate.slice(6)].join('-');
    const time = `${szTime.slice(0, 2)}:${szTime.slice(2, 4)}:${szTime.slice(4, 6)}`;
    return `${date} ${time}`;
};

export const getToday = () => {
    return new Date();
}

export const getDiffDate = (fromDate: string | Date, term: number) => {
    term = term * 86400000;
    const diffDate = new Date(fromDate).getTime() - term;
    return new Date(diffDate);
}

export const dateFormat = (
    date: Date,
    formating: string | undefined = 'Y-MM-dd'
  ) => {
    if(date.toString() === 'Invalid Date') date = new Date();
    date = new Date(date);
    return format(date.getTime && date.getTime(), formating);
  };
  
  export const stringToDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return new Date(Number(year), parseInt(month) - 1, Number(day));
  };
  