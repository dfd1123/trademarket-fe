import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { OpenOrderRowData } from '@/services/types/Trade';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import useService from '@/hooks/useService';
import { useTypedSelector } from '@/store';
import { OrderType, TradeInfoContext } from '@/provider/TradeInfoProvider';

interface PropsType {
  className?: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info: OpenOrderRowData;
}

const OpenOrderList = React.memo(
  ({ className, tableHdInfo, info }: PropsType) => {
    const services = useService();
    const context = useContext(TradeInfoContext);
  const { setOrder } = context;

    const { close } = useCurrentSymbol(info.symbol);
    const { PIP_LOWEST } = useTypedSelector(
      (state) => state.coinInfoSlice.symbols[info.symbol]
    );

    const [tableHd, setTableHd] = useState(tableHdInfo);

    const row = useMemo(() => {
      const newInfo = { ...info };
      const pointPosition = PIP_LOWEST;
      const currentPrice = unformatNumber(close ?? '0');

      newInfo.orderNo = info.orderNo.slice(15, 21);
      newInfo.currentPrice = formatNumber(currentPrice, pointPosition);
      newInfo.price = formatNumber(newInfo.price, pointPosition);

      return newInfo;
    }, [info, close]);

    const modifyReq = () => {
      setOrder({
        type: 'modifyCancel',
        price: info.price,
        amount: String(info.lot),
        orderType: 'URE',
        symbol: info.symbol,
        dealType: info.side,
        modType: '7',
        orderNo: info.orderNo
      })
    };

    useEffect(() => {
      const tempInfo = tableHdInfo.map((info) => ({
        ...info,
        label: info.label
          .replace(/ /gi, '-')
          .replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi, '')
          .toLowerCase(),
      }));
      setTableHd(tempInfo);
    }, []);

    return (
      <OpenOrderListStyle className={`${className}`} onClick={modifyReq}>
        {Object.values(row).map((data, index) => (
          <span
            key={`${row.symbol}${index}`}
            className={`${tableHd[index].label}`}
            style={{ width: `${tableHd[index].ratio * 100}%` }}
          >
            {data}
          </span>
        ))}
      </OpenOrderListStyle>
    );
  }
);

const OpenOrderListStyle = styled.div`
  span{
    cursor: pointer;
  }
`;

export default OpenOrderList;
