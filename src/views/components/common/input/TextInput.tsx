import React, { useState, useRef } from "react";
import styled from "styled-components";
import basicResetClose from "@/assets/img/icon/ico-circle-close.svg";
import searchIcon from "@/assets/img/icon/ico-search.svg";

interface PropsType extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  reset?: boolean;
  enter?: () => void;
  change?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({
  label,
  className,
  type = "text",
  name,
  value,
  placeholder = "",
  readOnly = false,
  disabled = false,
  tabIndex = 0,
  reset = false,
  enter,
  change,
}: PropsType) => {
  const isSearch = type === "search";
  const input = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);

  const handleEnter = () => {
    if (enter) enter();
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
    if (change) change(e);
  };

  const handleReset = () => {
    if (input.current) input.current.value = "";
  };

  return (
    <div
      className={`${className} ${isSearch ? "search" : ""} ${
        focus ? "focus" : ""
      } ${reset ? "reset" : ""}`}
    >
      <div className="inp-cont">
        <input
          ref={input}
          type={type}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          tabIndex={tabIndex}
          onKeyPress={handleKeyPress}
          onChange={handleValueChange}
          onFocus={() => toggleFocus(true)}
          onBlur={() => toggleFocus(false)}
        />
        <div className="btn-cont">
          {value && reset ? (
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
  }

  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    padding: 10px;
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
      opacity: 0.4;
      &::after {
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
          padding-right: 50px;
        }
      }
    }
  }

  &.search {
    input {
      padding-right: 30px;
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
    transform: translate(0px, 0px);
  }

  input {
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
  }

  &.focus {
    label {
      height: auto;
      font-size: 0.5em;
      top: -7px;
      /* left: 0; */
      background-color: #fff;
    }
  }
`;

export default BasicInput;
