import React from "react";
import styled from "styled-components";
import Ripples from "react-ripples";

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ripple?: boolean;
  color?: string;
  during?: number;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, ripple, color, during, className, onClick, disabled}: PropTypes) => {
  ripple = ripple ?? true;
  color = color ?? "rgba(0, 0, 0, .3)";
  during = during ?? 600;

  return ripple && !disabled ? (
    <Ripples className={`btn ${className}`} color={color} during={during}>
      <button onClick={onClick} disabled={disabled}>{children}</button>
    </Ripples>
  ) : (
    <button className={`btn ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
  );
};

export const BasicButton = styled(Button)`
    display: inline-block;
    padding: 0 10px;
    font-size: 1em;
    line-height: 1.5em;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ddd;
`;

export const NoBorderButton = styled(BasicButton)`
    border: none;
`;

export const YellowButton = styled(BasicButton)`
color: #fff;
  background-color: rgb(255, 171, 46);
  border: 1px solid rgb(255, 171, 46);

  >button{
    color: #fff;
  }
`;

export default BasicButton;
