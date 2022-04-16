import React, { useState } from 'react';
import styled from 'styled-components';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {
  className?: string;
  list: { label: string; ratio: number }[];
}

const TableHdComp = ({ className, list }: PropsType) => {
  return (
    <div className={`tb-hd ${className}`}>
      {list.map((hd) => (
        <span
          key={`hd-${hd.label}`}
          className={hd.label
            .replace(/ /gi, '')
            .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi, '')
            .toLowerCase()}
          style={{ width: `${100 * hd.ratio}%` }}
        >
          {hd.label}
        </span>
      ))}
    </div>
  );
};

const TableHd = styled(TableHdComp)`
  width: 100%;
  border-bottom: 1px solid #33353b;
  span {
    display: inline-block;
    padding: 15px 0;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
`;

export default TableHd;
