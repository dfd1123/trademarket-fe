import React from "react";
import styled from "styled-components";
import Ripples from "react-ripples";
import { useNavigate } from "react-router";

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement | HTMLElement> {
  children: React.ReactNode;
  ripple?: boolean;
  color?: string;
  during?: number;
  className?: string;
  to?: string;
  disabled?: boolean;
}

const Button = ({ children, to, ripple = true, color, during, className, onClick, disabled}: PropTypes) => {
  color = color ?? "rgba(255,255,255,0.3)";
  during = during ?? 900;

  const navigate = useNavigate();

  const handleClick = (e: any) => {
    if(to) navigate(to);
    else onClick && onClick(e);
  }

  return ripple ? (
    <Ripples className={`btn ${className} ${disabled && 'disabled'}`} color={color} during={during} onClick={handleClick}>
      <button disabled={disabled}>{children}</button>
    </Ripples>
  ) : (
    <button className={`btn ${className}`} onClick={handleClick} disabled={disabled}>{children}</button>
  );
};

export const BasicButton = styled(Button)`
    position:relative;
    display: inline-block;
    padding: 0 0;
    font-size: 1em;
    line-height: 1.5em;
    text-align: center;
    border-radius: 4px;
    border: 1px solid #ddd;

    >button{
      min-width: inherit;
      min-height: inherit;
      width:100%;
      height:100%;
      font-size:inherit;
      font-weight:inherit;
      color:inherit;

      &:disabled{
        cursor: no-drop;
      }
    }
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

export const YellowBorderButton = styled(BasicButton)`
  color: #fff;
  background-color: #1e1f23;
  border: 1px solid rgb(255, 171, 46);

  >button{
    color: rgb(255, 171, 46);
  }
`;

export const GreenButton = styled(BasicButton)`
  color: #fff;
  background-color: #41DA78;
  border: 1px solid #41DA78;

  >button{
    color: #fff;
  }
`;

export const RedButton = styled(BasicButton)`
  color: #fff;
  background-color: #F8585A;
  border: 1px solid #F8585A;

  >button{
    color: #fff;
  }
`;

export default BasicButton;
