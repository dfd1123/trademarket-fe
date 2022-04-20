import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import { useParams } from 'react-router';
import { SimpleTradeHistoryData } from '@/services/types/Trade';
import SimpleTradeList from './SimpleTradeList';
import { liveDataDateFormat } from '@/utils/dateUtils';
import { formatNumber } from '@/utils/numberUtils';

interface PropsType {
  className?: string;
}

const SimpleTradeHistory = ({ className }: PropsType) => {
  const { symbol: selectedSymbol } = useParams();
  const realTimeData = useTypedSelector(
    (state) => state.realTimeData.price[selectedSymbol as string]
  );
  const { PIP_LOWEST } = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[selectedSymbol as string] || {}
  );

  const [history, setHistory] = useState<SimpleTradeHistoryData[]>([]);

  useEffect(() => {
    if (realTimeData) {
      const arr: SimpleTradeHistoryData[] = [
        {
          datetime: liveDataDateFormat(
            realTimeData.szDate,
            realTimeData.szTime
          ),
          close: formatNumber(realTimeData.szClose, PIP_LOWEST),
          amount: Number(realTimeData.szVolume),
          type: realTimeData.szBuyOrSell,
        },
        ...history,
      ];
      setHistory(arr.length >= 20 ? arr.slice(-20) : arr);
    }
  }, [realTimeData]);

  return (
    <SimpleTradeHistoryStyle className={className}>
      <div className="tb-hd">
        <div className="td price">Time</div>
        <div className="td amount">Price</div>
        <div className="td total">Amount</div>
      </div>
      <div className="tb-bd">
        {history.map((trade, index) => (
          <SimpleTradeList key={`trade-${index}`} {...trade} />
        ))}
      </div>
    </SimpleTradeHistoryStyle>
  );
};

const SimpleTradeHistoryStyle = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 100%;

  .td {
    display: inline-block;
    &.price {
      width: 45%;
      padding-left: 15px;
      text-align: left;
    }
    &.amount {
      width: 27.5%;
      text-align: right;
    }
    &.total {
      width: 27.5%;
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
      line-height: 28px;
      border-bottom: 1px solid #33353b;
    }
  }
`;

export default SimpleTradeHistory;
