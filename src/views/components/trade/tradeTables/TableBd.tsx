import React, { useState } from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  children: React.ReactNode;
}

const TableBdComp = ({ className, children }: PropsType) => {
  return <div className={`tb-bd ${className}`}>{children}</div>;
};

const TableBd = styled(TableBdComp)`
  > div {
    width: 100%;
    border-bottom: 1px solid #33353b;
    span {
      display: inline-block;
      vertical-align: middle;
      padding: 5px 0;
      font-size: 12px;
      color: #fff;
      text-align: center;
    }
  }
`;

export default TableBd;
