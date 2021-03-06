import styled from 'styled-components';
import useService from '@/hooks/useService';
import OrderTableList from './OrderTableList';
import { useParams } from 'react-router';
import { useTypedSelector } from '@/store';
import { OrderOutput } from '@/store/realTime/types/realTimeData';
import { useEffect } from 'react';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {
  className?: string;
}

const OrderTable = ({className} : PropsType) => {
  const services = useService();
  const { symbol: selectedSymbol } = useParams();

  const { PIP_LOWEST } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[selectedSymbol as string] || {}
  );
  const liveData: OrderOutput = useTypedSelector(
    (state) => state.realTimeData.order[selectedSymbol as string]
  );

  services.realTime.orderData();

  const { buyOrder, sellOrder } = services.trade.orderBookDataSetting(
    liveData,
    PIP_LOWEST,
    true
  );

  return (
    <OrderTableStyle className={className}>
      <div className="tb-hd">
        <div className="td price">Price</div>
        <div className="td amount">Amount</div>
        <div className="td total">Total</div>
      </div>
      <div className="tb-bd">
        {sellOrder.map((order, idx) => (
          <OrderTableList key={`sell-order-${idx}`} type="sell" {...order} />
        ))}
        <div className="divide"></div>
        {buyOrder.map((order, idx) => (
          <OrderTableList key={`buy-order-${idx}`} type="buy" {...order} />
        ))}
      </div>
    </OrderTableStyle>
  );
};

const OrderTableStyle = styled.div`
  position: relative;
  overflow-y: scroll;
  height:100%;

  .td {
    display: inline-block;
    &.price {
      width: 40%;
      padding-left: 15px;
      text-align: left;
    }
    &.amount {
      width: 30%;
      text-align: right;
    }
    &.total {
      width: 30%;
      padding-right: 15px;
      text-align: right;
    }
    &.divide {
      display: block;
      width: 100%;
      line-height: 0px !important;
    }
  }

  .tb-hd {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    background-color: #1e1f23;

    .td {
      font-size: 13px;
      color: #a1a1a1;
      line-height: 40px;
    }
  }

  .tb-bd {
    .td {
      font-size: 12px;
      color: #fff;
      line-height: 24px;
      border-bottom: 1px solid #33353b;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    height: 408px;
    margin-bottom:10px;
    .tb-hd {
      .td{
        line-height: 28px;
        &:last-child{
          display:none;
        }
      }
    }
    .tb-bd{
      .td{
        line-height: 22px;
      }
      .td-box{
        &:last-child{
          display:none;
        }
      }
    }

    .td {
      &.price {
        width: 60%;
        padding-left: 15px;
        text-align: left;
      }
      &.amount {
        padding-right: 15px;
        width: 40%;

      }
    }
  }
`;

export default OrderTable;
