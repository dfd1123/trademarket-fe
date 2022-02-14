import { useState } from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";
import {dateFormat} from '@/utils/dateUtils';
import { ko } from "date-fns/locale";

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
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const initialFocusDate = new Date(initialFocusedDate ?? '');
    const minDate = new Date(min ?? '1900-01-01');
    const maxDate = new Date(max ?? '2100-01-01');
    const handleDateChange = (value : Date | null) => {
        let result = null;
        if(value) result = dateFormat(value, format);
        if(onChange) onChange(result);

        setSelectedDate(value);
    }
    
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                autoOk
                orientation={orientation}
                variant="static"
                openTo="date"
                animateYearScrolling={animateYearScrolling}
                disabled={disabled}
                disableFuture={disableFuture}
                disablePast={disablePast}
                minDate={minDate}
                maxDate={maxDate}
                minDateMessage="최소 날짜 이전이 아니어야 합니다."
                maxDateMessage="최대 날짜 이후가 아니어야 합니다."
                initialFocusedDate={initialFocusDate}
                views={["year", "month", "date"]}
                format="dd-MMM-yyyy"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    );
}

export default Calendar;