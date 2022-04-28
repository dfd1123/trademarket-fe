import * as React from 'react';
import styled from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import {dateFormat} from '@/utils/dateUtils';
import { ko } from "date-fns/locale";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import { RangeInput, DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import koLocale from 'date-fns/locale/ko';
import TextField from '@mui/material/TextField';
import BasicInput from '@/views/components/common/input/TextInput';
import {useEffect} from 'react';


interface PropsType {
    date?: number;
    disabled?: boolean;
    disableFuture?: boolean;
    disablePast?: boolean;
    value?: string[] | null;
    animateYearScrolling?: boolean;
    min?:string;
    max?:string;
    orientation?:"landscape" | "portrait";
    format?: string,
    onChange?: (value: any) => void
}

const RangeCalendar = ({date, disabled = false, disableFuture = false, disablePast = false, value, animateYearScrolling = false, min, max, orientation = 'landscape', format = 'Y-MM-dd', onChange } : PropsType) => {
    const [selectedDate, setSelectedDate] = React.useState<RangeInput<Date | null>>([null,null]);
    const minDate = new Date(min ?? '1900-01-01');
    const maxDate = new Date(max ?? '2100-01-01');
    const today = new Date();
    const handleDateChange = (value : any) => {
        let [fromDate, toDate] = value;
        if(fromDate) fromDate = dateFormat(fromDate, format);
        if(toDate) toDate = dateFormat(toDate, format);
        onChange && onChange([fromDate, toDate]);

        // setSelectedDate(new Date(value.getTime()));
    }

    useEffect(() => {
        if(value && value.length) handleDateChange([value[0], value[1]]);
    }, [])

    return (
        <DatePickerStyle>
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
          <StaticDateRangePicker
            mask="____/__/__"
            // openTo="day"
            minDate={minDate}
            maxDate={max ? maxDate : today}
            value={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <input  />}
           />
        </LocalizationProvider>
        </DatePickerStyle>
    );
}

const DatePickerStyle = styled.div`
    .PrivatePickersToolbar-root{
        display:none;
    }
`;

export default RangeCalendar;
