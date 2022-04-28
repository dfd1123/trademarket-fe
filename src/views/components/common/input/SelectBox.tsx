import React from 'react';
import styled from 'styled-components';
import iconArrowWhite from '@/assets/img/icon/icon-arrow-d-white.svg';

interface PropsType {
  className?: string;
  name: string;
  list: {
    name: string;
    value: any;
  }[];
  value?: any;
  disabled?: boolean;
  onChange?: (value: any, name?: string) => void;
}

const SelectBox = ({ className, name, list, value, disabled = false, onChange }: PropsType) => {
  const handleChange = (e) => {
    const { value } = e.target;

    onChange && onChange(value, name);
  };
  return (
    <select
      name={name}
      className={className}
      value={value}
      disabled={disabled}
      onChange={handleChange}
    >
      {list &&
        list.map((info) => (
          <option key={name + info.value} value={info.value}>
            {info.name}
          </option>
        ))}
    </select>
  );
};

export const DarkSelectBox = styled(SelectBox)`
  position: relative;
  padding: 13px 10px;
  padding-right: 30px;
  font-size: 14px;
  color: #fff;
  background-color: #1e1f23;
  border: 2px solid #33353b;
  border-radius: 4px;
  outline: transparent;
  appearance: none;
  background-image: url(${iconArrowWhite});
  background-repeat: no-repeat;
  background-size: 10px;
  background-position: calc(100% - 10px) center;
  cursor: pointer;
`;

export default DarkSelectBox;
