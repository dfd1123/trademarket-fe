import {format} from 'date-fns';

export const dateFormat = (date: Date, formating: string | undefined = 'Y-MM-dd') => {
    return format(date, formating)
}