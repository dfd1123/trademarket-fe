import * as React from 'react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import {dateFormat} from '@/utils/dateUtils';
import { ko } from "date-fns/locale";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import koLocale from 'date-fns/locale/ko';
import TextField from '@mui/material/TextField';
import BasicInput from '@/views/components/common/input/TextInput';
import {useEffect} from 'react';


interface PropsType {
    date?: number;
    disabled?: boolean;
    disableFuture?: boolean;
    disablePast?: boolean;
    initialFocusedDate?: string;
    animateYearScrolling?: boolean;
    min?:string;
    max?:string;
    orientation?:"landscape" | "portrait";
    format?: string,
    onChange: (value: any) => void
}

const Calendar = ({date, disabled = false, disableFuture = false, disablePast = false, initialFocusedDate, animateYearScrolling = false, min, max, orientation = 'landscape', format = 'Y-MM-dd', onChange } : PropsType) => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
    const initialFocusDate = new Date(initialFocusedDate ?? '');
    const minDate = new Date(min ?? '1900-01-01');
    const maxDate = new Date(max ?? '2100-01-01');
    const handleDateChange = (value : any) => {
        let result = '';
        if(value) result = dateFormat(value, format);
        if(onChange) onChange(result);

        const el = document.querySelector('.MuiTypography-h4');
        if(el) {
            // @ts-ignore
            el.style.opacity = 0;
            setTimeout(() => {
                // @ts-ignore
                el.style.opacity = 1;
                el.textContent = dateFormat(value, 'Y년 MM월 dd일');
            }, 0.01);
        }

        setSelectedDate(new Date(value.getTime()));
    }

    useEffect(() => {
        if(date) handleDateChange(new Date(date || ''));
    }, [])

    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/*<DatePicker*/}
            {/*    autoOk*/}
            {/*    orientation={orientation}*/}
            {/*    variant="static"*/}
            {/*    openTo="date"*/}
            {/*    animateYearScrolling={animateYearScrolling}*/}
            {/*    disabled={disabled}*/}
            {/*    disableFuture={disableFuture}*/}
            {/*    disablePast={disablePast}*/}
            {/*    minDate={minDate}*/}
            {/*    maxDate={maxDate}*/}
            {/*    minDateMessage="최소 날짜 이전이 아니어야 합니다."*/}
            {/*    maxDateMessage="최대 날짜 이후가 아니어야 합니다."*/}
            {/*    initialFocusedDate={initialFocusDate}*/}
            {/*    views={["year", "month", "date"]}*/}
            {/*    format="dd-MMM-yyyy"*/}
            {/*    value={selectedDate}*/}
            {/*    onChange={handleDateChange}*/}
            {/*/>*/}
          <StaticDatePicker<Date>
            mask="____/__/__"
            orientation="landscape"
            openTo="day"
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <input  />}
           />
        </LocalizationProvider>
    );
}

export default Calendar;
