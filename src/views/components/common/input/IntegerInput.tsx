import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '@/views/components/common/input/TextInput';
import BasicButton from '@/views/components/common/Button';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';

interface PropsType {
  className?: string;
  label?: string;
  name?: string;
  value?: number | string;
  step?: number;
  dec?: number;
  placeholder?: string;
  onChange?: (value: any, name?: string) => void;
}

const IntegerInputComp = ({ className, label, name, value, step = 1, dec = 2, placeholder, onChange }: PropsType) => {
    const [number, setNumber] = useState(String(value ?? '0'));

    const increase = () => {
        setNumber(String(unformatNumber(number) + step));
    }

    const decrease = () => {
        const result = unformatNumber(number) - step < 0 ? 0 : unformatNumber(number) - step; 
        setNumber(String(result));
    }

    const handleChange = (value: string, name?: string) => {
        setNumber(String(value ?? '0'));
        onChange && onChange(value, name);
    }

    useEffect(() => {
        console.log(value);
        setNumber(String(number));
    },[value])

  return (
    <div className={className}>
      <TextInput name={name} label={label} value={value} placeholder={placeholder} number onChange={handleChange} />
      <div className="btn-holder">
        <BasicButton onClick={decrease}>-</BasicButton>
        <BasicButton onClick={increase}>+</BasicButton>
      </div>
    </div>
  );
};

const IntegerInput = styled(IntegerInputComp)`
  position: relative;

  ${TextInput}{
      width:100%;
      
      input{
        padding-right: 70px !important;
      }
  }

  .btn-holder {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    height: 100%;

    ${BasicButton} {
      width: 30px;
      height: 100%;
      background-color: #1e1f23;
      border: 1px solid #33353b;
      border-radius: 0;

      button {
        color: #fff;
      }
    }
  }
`;

export default IntegerInput;
