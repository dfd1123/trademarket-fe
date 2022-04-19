import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import _uniqueId from 'lodash/uniqueId';
import Ripples from 'react-ripples';

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  data?: any;
  type?: string;
  label: string;
  name: string;
  value?: string | number | string[];
  className?: string;
  ripple?: { color: string; during: number } | null;
  onChange?: (value: any, name?: string) => void;
}

const CheckBox = React.memo(
  ({
    data,
    type = 'checkbox',
    label,
    name,
    value,
    className = '',
    readOnly = false,
    disabled = false,
    ripple = { color: 'rgba(0, 0, 0, .3)', during: 600 },
    onChange,
  }: PropsType) => {
    const uniqueId = `${type}-${_uniqueId()}`;
    const [check, setCheck] = useState(false);
    const inpRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (data !== null && typeof data !== 'undefined') {
        if (type === 'checkbox') {
          const uniqData = [...new Set(data)];
          if (onChange && JSON.stringify(uniqData) !== JSON.stringify(data))
            onChange(uniqData);
        }
        handleCheck(data);
      }
    }, [data]);

    const handleCheck = (changeData: any) => {
      if (inpRef.current) {
        setCheck(inpRef.current.checked);
        if (Array.isArray(changeData)) {
          if (changeData.includes(value)) {
            inpRef.current.checked = true;
            setCheck(true);
          }
        } else if (typeof changeData === 'boolean') {
          inpRef.current.checked = changeData;
          setCheck(changeData);
        } else {
          inpRef.current.checked = data === value;
          setCheck(data === value);
        }
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let changeValue: any = false;
      if (type === 'checkbox') {
        changeValue = [];
        const query = `input[name="${name}"]:checked`;
        const selectedEls = document.querySelectorAll(
          query
        ) as unknown as HTMLInputElement[];

        for (let i = 0; i < selectedEls.length; i++) {
          const elValue =
            typeof value === 'number'
              ? Number(selectedEls[i].value)
              : selectedEls[i].value;
          let indexOf = changeValue.findIndex(
            (val: unknown) => val === elValue
          );
          if (indexOf === -1) changeValue.push(elValue);
        }

        changeValue = [...new Set(changeValue)];
      } else {
        const { checked } = e.target;

        if (checked) {
          if (value) changeValue = value;
          else changeValue = true;
        }
      }

      if (onChange) onChange(changeValue, name);
      // handleCheck(changeValue);
    };

    return ripple ? (
      <Ripples
        className={`btn ${className}`}
        color={ripple.color}
        during={ripple.during}
      >
        <input
          ref={inpRef}
          id={uniqueId}
          type={type}
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
        />
        <label htmlFor={uniqueId} className={`${check ? 'checked' : ''}`}>
          {label}
        </label>
      </Ripples>
    ) : (
      <div className={className}>
        <input
          ref={inpRef}
          id={uniqueId}
          type={type}
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
        />
        <label htmlFor={uniqueId} className={`${check ? 'checked' : ''}`}>
          {label}
        </label>
      </div>
    );
  }
);

export const BasicCheckBox = styled(CheckBox)`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;

  > label {
    display: block;
  }

  input:checked,
  input:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  input:checked + label,
  input:not(:checked) + label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
  }
  input:checked + label:before,
  input:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 10px;
    border: 2px solid rgb(255,171,46);
    border-radius: 100%;
    background: transparent;
  }
  input:checked + label:after,
  input:not(:checked) + label:after {
    content: '';
    width: 6px;
    height: 6px;
    background: rgb(255,171,46);
    position: absolute;
    top: 4px;
    left: 4px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
  }
  input:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  input:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const ButtonCheckBox = styled(BasicCheckBox)`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  > input {
    display: none;

    &:checked {
      + label {
        padding-left: 0;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #aaa;
      }
    }
    &:not(:checked) + label {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 0;
      line-height: 100%;
    }
  }

  > label {
    padding: 10px;
    text-align: center;
    background-color: #ddd;

    &::after,
    &::before {
      display: none;
    }
  }
`;

export default BasicCheckBox;
