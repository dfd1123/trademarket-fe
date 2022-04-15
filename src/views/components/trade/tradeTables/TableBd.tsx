import React, { useState } from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  children: React.ReactNode;
}

const TableBdComp = ({ className, children }: PropsType) => {
  return (
    <div className={`tb-bd ${className}`}>
      {children}
    </div>
  );
};

const TableBd = styled(TableBdComp)``;

export default TableBd;
