import React from 'react';
import { DOWN_COLOR, UP_COLOR } from '@/data/colorData';
import { SimpleTradeHistoryData } from '@/services/types/Trade';
import styled from 'styled-components';

interface PropsType extends SimpleTradeHistoryData {}

const SimpleTradeList = ({ datetime, close, amount, type }: PropsType) => {
  return (
    <SimpleTradeListStyle type={type}>
      <div className="td price">{datetime}</div>
      <div className="td amount">{close}</div>
      <div className="td total">{amount}</div>
    </SimpleTradeListStyle>
  );
};

const SimpleTradeListStyle = styled.div<{ type: 'S' | 'B' }>`
  .td {
      &.price{
          font-size:11px;
      }
    &.amount {
      ${(props) =>
        props.type === 'B'
          ? `color: ${UP_COLOR} !important;`
          : `color: ${DOWN_COLOR} !important;`}
    }
  }
`;

export default React.memo(SimpleTradeList);
