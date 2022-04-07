import {format} from 'date-fns';

export const liveDataDateFormat = (szDate: string, szTime: string) => {
    const date = [szDate.slice(0, 4), szDate.slice(4, 6), szDate.slice(6)].join('-');
    const time = `${szTime.slice(0, 2)}:${szTime.slice(2, 4)}:${szTime.slice(4, 6)}`;
    return `${date} ${time}`;
};

export const dateFormat = (date: Date, formating: string | undefined = 'Y-MM-dd') => {
    return format(date, formating)
}