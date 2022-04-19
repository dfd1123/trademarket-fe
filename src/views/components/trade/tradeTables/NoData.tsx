import React from 'react';
import styled from 'styled-components';

interface PropsType {
  className?: string;
  msg: string;
}

const NoDataComp = ({ className, msg }: PropsType) => {
  return (
    <p className={className}>
      <span>{msg}</span>
    </p>
  );
};

const NoData = styled(NoDataComp)`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #ccc;
`;

export default NoData;
