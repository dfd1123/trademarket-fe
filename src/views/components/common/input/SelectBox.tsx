import React from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  name: string;
  list: {
    name: string;
    value: any;
  }[];
  value?: any;
  onChange?: (value: any, name?: string) => void;
}

const SelectBox = ({ className, name, list, value, onChange }: PropsType) => {
  const handleChange = (e) => {
    const { value } = e.target;

    onChange && onChange(value, name);
  };
  return (
    <select
      name={name}
      className={className}
      value={value}
      onChange={handleChange}
    >
      {list &&
        list.map((info) => <option key={info.value} value={info.value}>{info.name}</option>)}
    </select>
  );
};

export const DarkSelectBox = styled(SelectBox)`
  padding: 13px 10px;
  font-size: 14px;
  color: #fff;
  background-color: #1E1F23;
  border: 2px solid #33353b;
  border-radius: 4px;
  outline: transparent;
`;

export default DarkSelectBox;
