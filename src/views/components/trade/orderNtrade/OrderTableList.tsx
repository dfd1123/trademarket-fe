import React, { useContext } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import { useParams } from 'react-router';
import { OrderBookData } from '@/services/types/Trade';
import { DOWN_COLOR, UP_COLOR } from '@/data/colorData';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import { TradeInfoContext } from '@/provider/TradeInfoProvider';

interface OrderListGraphProps {
  rate: number | string;
  type: 'buy' | 'sell';
}

interface PropsType extends OrderBookData {
  className?: string;
  type: 'buy' | 'sell';
}

const OrderTableList = ({
  className,
  type,
  price,
  rem,
  acc,
  amountPerc = 0,
  totalPerc = 0,
}: PropsType) => {
  const { symbol: selectedSymbol } = useParams();
  const context = useContext(TradeInfoContext);
  const { setOrder, } = context;
  const { MIN_ORDCNT } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[selectedSymbol as string] || {}
  );

  const sumToFixed =
    Number(MIN_ORDCNT) < 1 ? (1 / Number(MIN_ORDCNT)).toString().length - 1 : 0;

  const selectOrder = () => {
    setOrder({
      type: 'newOrder',
      orderType: 'UOE',
      modType: '4',
      symbol: selectedSymbol as string,
      dealType: type === 'buy' ? '079' : '081',
      price: unformatNumber(price.toString()).toString(),
      amount: '1',
    });
  };

  return (
    <OrderTableListStyle
      className={className}
      type={type}
      onClick={selectOrder}
    >
      <div className="td-box">
        <div className="td price">{price}</div>
        <div className="td amount">{formatNumber(rem, sumToFixed)}</div>
        <OrderListGraphStyle rate={amountPerc} type={type} />
      </div>
      <div className="td-box">
        <div className="td total">{formatNumber(Number(acc), sumToFixed)}</div>
        <OrderListGraphStyle rate={totalPerc} type={type} />
      </div>
    </OrderTableListStyle>
  );
};

const OrderListGraphStyle = styled.div<OrderListGraphProps>`
  position: absolute;
  top: 2.5px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  width: 98%;
  height: 100%;
  margin: 0 1%;
  ${(props) =>
    props.type === 'buy'
      ? `background-color: ${DOWN_COLOR};`
      : `background-color: ${UP_COLOR};`}
  /* border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px; */
  transform: scaleX(${(props) => props.rate});
  transform-origin: left;
  opacity: 0.3;
  transition: transform 0.5s;
`;

const OrderTableListStyle = styled.div<{
  className?: string;
  type: 'buy' | 'sell';
}>`
  cursor: pointer;
  &:hover {
    background-color: #33353b;
  }
  .td-box {
    position: relative;
    display: inline;
    &:nth-of-type(1) {
      ${OrderListGraphStyle} {
        /* border-top-left-radius: 7px;
        border-bottom-left-radius: 7px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px; */
        transform-origin: right;
      }
    }
  }
  .td {
    position: relative;
    z-index: 2;
    &.price {
      ${(props) =>
        props.type === 'buy'
          ? `color: ${UP_COLOR} !important;`
          : `color: ${DOWN_COLOR} !important;`}
    }
  }
`;

export default React.memo(OrderTableList);
