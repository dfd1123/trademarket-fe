import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { MyDetailTradeHistoryRowData, OpenOrderRowData } from '@/services/types/Trade';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import useService from '@/hooks/useService';
import { useTypedSelector } from '@/store';
import { translateSzPoCode } from '@/utils/translateUtils';

interface PropsType {
  className?: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info: MyDetailTradeHistoryRowData;
}

const OrderDetailList = React.memo(
  ({ className, tableHdInfo, info }: PropsType) => {
    const services = useService();
    const { PIP_LOWEST } = useTypedSelector(
      (state) => state.coinInfoSlice.symbols[info.symbol]
    );

    const [tableHd, setTableHd] = useState(tableHdInfo);

    const row = useMemo(() => {
      const newInfo = { ...info };

      const pointPosition = PIP_LOWEST;

      newInfo.side = translateSzPoCode(info.side, false);
      newInfo.orderPrice = formatNumber(info.orderPrice, pointPosition);
      newInfo.stopPrice = formatNumber(info.stopPrice, pointPosition);
      newInfo.limitPrice = formatNumber(info.limitPrice, pointPosition);

      return newInfo;
    }, [info, close]);

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
      <OrderDetailListStyle className={`${className}`}>
        {Object.values(row).map((data, index) => (
          <span
            key={`${row.symbol}${index}`}
            className={`${tableHd[index].label}`}
            style={{ width: `${tableHd[index].ratio * 100}%` }}
          >
            {data}
          </span>
        ))}
      </OrderDetailListStyle>
    );
  }
);

const OrderDetailListStyle = styled.div``;

export default OrderDetailList;
