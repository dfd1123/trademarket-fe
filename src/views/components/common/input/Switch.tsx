import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

export const Switch = () => {
  return (
    <SwitchStyle className="switch-button">
      <input type="checkbox" />
      <span className="on-off"></span>
    </SwitchStyle>
  );
};

const SwitchStyle = styled.label`
  position: relative;
  width: 42px;
  height: 26px;
  display: inline-block;
  box-sizing: border-box;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & .on-off {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  & .on-off:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    left: 3px;
    bottom: 2px;
    background-color: #fff;
    -webkit-transition: 0.5s;
    transition: 0.4s;
    border-radius: 20px;
  }

  & input:checked + .on-off {
    background-color: #1574bd;
  }

  & input:checked + .on-off:before {
    -webkit-transform: translateX(14px);
    -ms-transform: translateX(14px);
    transform: translateX(14px);
  }
`;
