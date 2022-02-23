import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Ripples from "react-ripples";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  data?: any;
  type?: 'checkbox' | 'radio';
  label: string;
  name: string;
  value?: string | number | string[];
  className?: string;
  ripple?: { color: string; during: number };
  onChange?: (value: any) => void;
}

const CheckBox = ({
  data,
  type = "checkbox",
  label,
  name,
  value,
  className = "",
  readOnly = false,
  disabled = false,
  ripple = { color: "rgba(0, 0, 0, .3)", during: 600 },
  onChange,
}: PropsType) => {
  const [check, setCheck] = useState(false);
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) {
      const uniqData = [...new Set(data)];
      if (onChange && JSON.stringify(uniqData) !== JSON.stringify(data))
        onChange(uniqData);
      handleCheck(data);
    }
  }, [data]);

  const handleCheck = (data: any) => {
    if (inpRef.current) {
      inpRef.current.checked = false;
      setCheck(false);
      if (Array.isArray(data)) {
        if (data.includes(value)) {
          inpRef.current.checked = true;
          setCheck(true);
        }
      } else if (typeof data === "boolean") {
        inpRef.current.checked = data;
        setCheck(data);
      } else {
        if (value === data) {
          inpRef.current.checked = true;
          setCheck(true);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let changeValue: any = false;
    if (type === "checkbox") {
      changeValue = [];
      const query = `input[name="${name}"]:checked`;
      const selectedEls = document.querySelectorAll(
        query
      ) as unknown as HTMLInputElement[];

      for (let i = 0; i < selectedEls.length; i++) {
        const elValue =
          typeof value === "number"
            ? Number(selectedEls[i].value)
            : selectedEls[i].value;
        let indexOf = changeValue.findIndex((val: unknown) => val === elValue);
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

    if (onChange) onChange(changeValue);
    handleCheck(changeValue);
  };

  return ripple ? (
    <Ripples
      className={`btn ${className}`}
      color={ripple.color}
      during={ripple.during}
    >
      <label className={`${className} ${check ? "checked" : ""}`}>
        <input
          ref={inpRef}
          type={type}
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
        />
        {label}
      </label>
    </Ripples>
  ) : (
    <div>
      <label className={`${className} ${check ? "checked" : ""}`}>
        <input
          ref={inpRef}
          type={type}
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={disabled}
          onChange={handleChange}
        />
        {label}
      </label>
    </div>
  );
};

export const BasicCheckBox = styled(CheckBox)`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;

  > label {
    display: block;
  }
`;

export const ButtonCheckBox = styled(BasicCheckBox)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  > input {
    display: none;
  }

  > label {
    padding: 10px;
    text-align: center;
    background-color: #ddd;

    &.checked {
      color: #fff;
      background-color: #aaa;
    }
  }
`;

export default BasicCheckBox;
