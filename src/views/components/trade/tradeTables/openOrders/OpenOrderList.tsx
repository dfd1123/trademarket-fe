import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { OpenOrderRowData } from '@/services/types/Trade';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import useService from '@/hooks/useService';
import { useTypedSelector } from '@/store';

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
    const { close } = useCurrentSymbol(info.symbol);
    const { PIP_LOWEST } = useTypedSelector(
      (state) => state.coinInfoSlice.symbols[info.symbol]
    );

    const [tableHd, setTableHd] = useState(tableHdInfo);

    const row = useMemo(() => {
      const newInfo = { ...info };
      const pointPosition = PIP_LOWEST;
      const currentPrice = unformatNumber(close ?? '0');

      newInfo.currentPrice = formatNumber(currentPrice, pointPosition);
      newInfo.price = formatNumber(newInfo.price, pointPosition);

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
      <OpenOrderListStyle className={`${className}`}>
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

const OpenOrderListStyle = styled.div``;

export default OpenOrderList;
