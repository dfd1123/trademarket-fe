import styled from 'styled-components';
import { useEffect, useState } from "react";
// import icoCalender from '@/assets/img/kmf/ico/ico-calender.svg';
import useModal from "@/hooks/useModal";
import TextInput from "@/views/components/common/input/TextInput";
import ModalDatePicker from "@/views/components/common/modal/ModalDatePicker";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  reset?: boolean;
  onChange?: (value: unknown, name?: any) => void;
}

const DateSelectInput = ({
  label = "날짜",
  className,
  name,
  value = "",
  placeholder = "0000-00-00",
  disabled = false,
  tabIndex = 0,
  onChange,
}: PropsType) => {
  const [date, setDate] = useState(value);
  const { openModal } = useModal();

  const openDatePickerModal = async () => {
    const result = await openModal(ModalDatePicker, {props: {initialFocusedDate: date, class:'date-select'}});

    setDate(result);
    if (onChange) {
      if (name) onChange(result, name);
      else onChange(result);
    }
  };

  useEffect(() => {
    setDate(value);
  }, [value])

  return (
    <DateSelectInputStyle>
      <TextInput
        type="text"
        label={label}
        name={name}
        value={date}
        className={className}
        disabled={disabled}
        tabIndex={tabIndex}
        readOnly
        placeholder={placeholder}
        onClick={openDatePickerModal}
      />
    </DateSelectInputStyle>
  );
};

const DateSelectInputStyle = styled.span`
${TextInput}{
  input{
    padding-right:38px;
    background-repeat: no-repeat;
    background-position: calc(100% - 8px) center;
  }
}
`

export default DateSelectInput;
