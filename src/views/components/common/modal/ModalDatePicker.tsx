import { useState } from 'react';
import styled from 'styled-components';
import { ModalStyle } from '@/views/components/common/modal/ModalTemplate';
import { ModalComponentPropsType } from '@/store/modal/types/modal';
import BasicButton from '@/views/components/common/Button';
import Calendar from '@/views/components/common/Calendar';
// import Calendar from 'react-calendar';
import { dateFormat } from '@/utils/dateUtils';
import 'react-calendar/dist/Calendar.css';
import RangeCalendar from '../RangeCalendar';

interface PropsType extends ModalComponentPropsType {
  initialFocusedDate?: string;
  initialDateRange?: string[];
  range?: boolean;
}

const ModalDatePicker = ({
  initialFocusedDate,
  initialDateRange,
  range = false,
  className,
  nonModal,
  close,
  resolve,
}: PropsType) => {
  const [date, setDate] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<any[] | null>(null);

  const formatDate = (calendarLocale: string, date: Date) => {
    return dateFormat(date, 'd');
  };

  const submit = () => {
    if (resolve) {
      if (date) resolve(date);
      else if (dateRange && dateRange.length === 2 && !dateRange.includes(null))
        resolve(dateRange);
    }
  };

  return (
    <ModalDatePickerStyle
      className={className}
      close={close}
      nonModal={nonModal}
    >
      <div className="calender-cont">
        {range ? (
          <RangeCalendar value={initialDateRange} onChange={setDateRange} />
        ) : (
          <Calendar
            date={
              initialFocusedDate
                ? new Date(initialFocusedDate).getTime()
                : new Date().getTime()
            }
            onChange={(val: Date) => setDate(dateFormat(val, 'yyyy-MM-dd'))}
          />
        )}

        <div className="btn-holder">
          <BasicButton onClick={close}>Cancel</BasicButton>
          <BasicButton
            onClick={submit}
            disabled={range && (dateRange || []).length < 2}
          >
            Enter
          </BasicButton>
        </div>
      </div>
    </ModalDatePickerStyle>
  );
};

const ModalDatePickerStyle = styled(ModalStyle)`
  .calender-cont {
    border-radius: 5px;
    overflow: hidden;
    .MuiPickerStaticWrapper-root {
      > div {
        flex-direction: column;
        .PrivatePickersToolbar-root {
          background-color: #1574bd;
          color: #fff;
          flex-direction: row;
          max-width: 100%;
          .MuiTypography-overline {
            display: none;
          }
          .MuiTypography-h4 {
            margin-left: 10px;
            font-size: 28px;
          }
          .PrivateDatePickerToolbar-penIcon {
            display: none;
          }
        }
      }
    }
  }

  .btn-holder {
    padding: 8px 0;
    text-align: right;
    background-color: #fff;
    border-top: 1px solid #000;

    ${BasicButton} {
      min-width: 77px;
      min-height: 36px;
      margin-left: 5px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      color: #1574bd;
    }
  }

  .react-calendar__tile—active:hover {
    background-color: #ff0000;
  }
`;

export default ModalDatePicker;
