import { useState } from "react";
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
    const result = await openModal(ModalDatePicker, {props: {initialFocusedDate: date}});
    console.log(result);
    setDate(result);
    if (onChange) {
      if (name) onChange(result, name);
      else onChange(result);
    }
  };

  return (
    <>
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
    </>
  );
};

export default DateSelectInput;
