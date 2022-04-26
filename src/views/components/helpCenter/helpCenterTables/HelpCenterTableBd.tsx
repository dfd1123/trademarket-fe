import React, { useState } from "react";
import styled from "styled-components";

interface PropsType {
  className?: string;
  children: React.ReactNode;
}

const HelpCenterTableBdComp = ({ className, children }: PropsType) => {
  return <div className={`tb-bd ${className}`}>{children}</div>;
};

const HelpCenterTableBd = styled(HelpCenterTableBdComp)`
  > div {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 40px;
    border: 1px solid transparent;
    border-bottom: 1px solid #33353b;

    span {
      display: inline-block;
      vertical-align: middle;
      padding: 5px 0;
      font-size: 12px;
      line-height: 16px;
      color: #fff;
      text-align: center;
    }

    &:hover {
      border: 1px solid rgb(141, 146, 221);
    }
  }
`;

export default HelpCenterTableBd;
