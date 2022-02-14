import { useState } from "react";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker } from "@material-ui/pickers";

interface PropsType {
    date?: number;
}

const Calender = ({date} : PropsType) => {
    const [selectedDate, handleDateChange] = useState<Date | null>(new Date(date || Date.now()));
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={selectedDate}
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider>
    );
}

export default Calender;