import styled from 'styled-components';
import TextInput from '@/views/components/common/input/TextInput';
import PostCodeModal from '@/views/components/common/PostCodeModal';
import useModal from '@/hooks/useModal';
import icoSearch from '@/assets/img/kmf/ico/ico-light-search.svg';
import { useState } from 'react';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
    reset?: boolean;
    onChange?: (value: unknown, name?: any) => void;
  }

const AddressInput = ({
    label = "",
    className,
    name,
    value = "",
    placeholder = "",
    disabled = false,
    tabIndex = 0,
    onChange,
  }: PropsType) => {
    const [address, setAddress] = useState(value);
    const { openModal } = useModal();
  
    const openAddressModal = async () => {
      const result = await openModal(PostCodeModal);
      console.log(result);
      setAddress(result);
      if (onChange) {
        if (name) onChange(result, name);
        else onChange(result);
      }
    };

    return (
        <AddressInputStyle>
            <TextInput type="text"
        label={label}
        name={name}
        value={address}
        className={className}
        disabled={disabled}
        tabIndex={tabIndex}
        readOnly
        placeholder={placeholder}
        onClick={openAddressModal}
        />
        </AddressInputStyle>
    );
}

const AddressInputStyle = styled.span`
${TextInput}{
    input{
        padding-right:34px;
        background-image: url(${icoSearch});
        background-repeat: no-repeat;
        background-position: calc(100% - 8px) center;
    }
}
`;

export default AddressInput;