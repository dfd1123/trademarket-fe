import React from "react";
import styled from "styled-components";
import Ripples from "react-ripples";

interface PropTypes extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ripple?: boolean;
  color?: string;
  during?: number;
}

const Button = ({ children, ripple, color, during, className }: PropTypes) => {
  ripple = ripple ?? true;
  color = color ?? "rgba(0, 0, 0, .3)";
  during = during ?? 600;

  return ripple ? (
    <Ripples color={color} during={during}>
      <button className={className}>{children}</button>
    </Ripples>
  ) : (
    <button className={className}>{children}</button>
  );
};

const BasicButton = styled(Button)`
    display: inline-block;
    padding: 0 10px;
    font-size: 1em;
    line-height: 1.5em;
    text-align: center;
    border-radius: 4px;
`;

export const YellowButton = styled(BasicButton)`
  color: #fff;
  background-color: rgb(255, 171, 46);
`;

export default BasicButton;
