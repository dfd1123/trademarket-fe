import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import basicResetClose from "@/assets/img/icon/ico-circle-close.svg";
import searchIcon from "@/assets/img/kmf/ico/ico-search2.svg";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: "email" | "search" | "tel" | "text" | "url" | "none" | "numeric" | "decimal";
  className?: string;
  reset?: boolean;
  number?:boolean;
  autocomplete?:'on'|'off';
  onEnter?: (value?: any , name?: any) => void;
  onInput?: (value : any , name?: any) => void;
  onChange?: (value : any , name?: any) => void;
}

const TextInput = ({
  label,
  className,
  type = "text",
  name,
  value = '',
  placeholder = "",
  readOnly = false,
  disabled = false,
  tabIndex = 0,
  reset = false,
  number = false,
  min,
  max,
  autoComplete = 'new-password',
  onEnter,
  onChange,
  onInput,
  onClick
}: PropsType) => {
  const isSearch = type === "search";
  const input = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(value || '');
  const [focus, setFocus] = useState(false);

  const handleEnter = () => {
    if (!onEnter) return;

    if (input.current) {
      const {value, name} = input.current;
      if (onEnter) {
        onEnter(value, name);
        return;
      }
    }
    onEnter('');
  };

  const toggleFocus = (status: boolean) => {
    setFocus(status);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEnter();
    }
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let {value, name} : {value: string | number, name: string} = e.target;
    if(number) {
      value = value.replace(/[^-\.0-9]/g, "");
      console.log(value)
      if(value === '.') value = '0.';
      if(min && value < min) value = min;
      if(max && value > max) value = max;
      value = String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    setText(value);
    if (onChange) onChange(number ?  Number(value.replace(/,/g, '')) : value, name);
    if (onInput) onInput(number ?  Number(value.replace(/,/g, '')) : value, name);
  };

  const handleReset = () => {
    if (input.current) {
      input.current.value = "";
      const {value, name} = input.current;
      setText('');
      if (onChange) onChange("", name);
    }
  };

  useEffect(() => {
    console.log(value);
    setText(value);
  }, [value]);

  return (
    <div className={`${className} ${isSearch ? "search" : ""} ${focus ? "focus" : ""} ${focus || String(text || '') || (input.current && input.current.value) ? "focus-value" : ""} ${reset ? "reset" : ""}`}>
      <div className="inp-cont">
        <input
          ref={input}
          type={type}
          name={name}
          value={value || text}
          placeholder={placeholder}
          inputMode={`${number ? 'numeric' : type}`}
          readOnly={readOnly}
          disabled={disabled}
          autoComplete={autoComplete}
          onKeyPress={handleKeyPress}
          onInput={handleValueChange}
          onChange={handleValueChange}
          onFocus={() => toggleFocus(true)}
          onBlur={() => toggleFocus(false)}
          onClick={onClick}
        />
        <div className="btn-cont">
          {text && reset ? (
            <button className="reset" onMouseDown={handleReset} />
          ) : (
            ""
          )}
          {isSearch ? <button className="search" onClick={handleEnter} /> : ""}
        </div>
      </div>
      {label ? <label htmlFor={name}>{label}</label> : ""}
    </div>
  );
};

export const BasicInput = styled(TextInput)`
  position: relative;
  display: inline-flex;
  flex-direction: column-reverse;

  .inp-cont {
    position: relative;
    width:inherit;
    height:inherit;
  }

  label {
    display: block;
    margin-bottom: 8px;
    padding-left:3px;
    font-size:14px;
    line-height: 20px;
    color:#828282;
  }
  input {
    width:inherit;
    height:inherit;
    padding: 10px;
    border: 1px solid #F4F4F4;
    border-radius: 5px;
    background-color: #F4F4F4;
    outline: transparent;

    &::placeholder{
      color:#BFBFBF;
    }
  }

  .btn-cont {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    > button {
      padding: 0 3px;
      &:last-child {
        margin-right: 7px;
      }
      &::after {
        content: "";
        display: block;
        width: 15px;
        height: 15px;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .reset {
      display: none;
      opacity: 0.4;
      &::after {
        width: 15px;
        height: 15px;
        background-image: url(${basicResetClose});
      }
    }

    .search {
      /* opacity: 0.4; */
      &::after {
        width: 28px;
        height: 28px;
        background-image: url(${searchIcon});
      }
    }
  }

  &.focus {
    .btn-cont {
      .reset {
        display: block;
      }
    }
  }

  &.reset {
    &.focus {
      input {
        padding-right: 30px;
      }
      &.search {
        input {
          padding-right: 60px;
        }
      }
    }
  }

  &.search {
    input {
      padding-right: 50px;
    }
  }
`;

export const MerterialInput = styled(BasicInput)`
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 5px;
    z-index: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 3px 5px;
    pointer-events: none;
    transition: font-size 0.2s, top 0.2s;
    font-size: 1em;
    color: #000;;
    transform: translate(0px, 0px);
  }

  input {
    border: 1px solid #000000;
    background-color:#fff;
    outline: #000 !important;
    
    &::-webkit-input-placeholder,
    &:-moz-placeholder,
    &::-moz-placeholder,
    &:-ms-input-placeholder {
      color: transparent;
    }
    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      display: none;
    }

    &:focus{
      border:2px solid #000;
    }
  }

  &.focus-value {
    label {
      height: auto;
      font-size: 0.5em;
      top: -7px;
      /* left: 0; */
      background-color: #fff;
    }
  }
`;

export default MerterialInput;
