import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { MyTradeHistoryRowData, OpenOrderRowData } from '@/services/types/Trade';
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
  info: MyTradeHistoryRowData;
}

const ExecutionList = React.memo(
  ({ className, tableHdInfo, info }: PropsType) => {
    const services = useService();
    const { PIP_LOWEST } = useTypedSelector(
      (state) => state.coinInfoSlice.symbols[info.symbol]
    );

    const [tableHd, setTableHd] = useState(tableHdInfo);

    const row = useMemo(() => {
      const newInfo = { ...info };

      const pointPosition = newInfo.pointPosition;

      newInfo.orderPrice = formatNumber(info.orderPrice, pointPosition);
      newInfo.excutePrice = formatNumber(info.excutePrice, pointPosition);

      return newInfo;
    }, [info]);

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
      <ExecutionListStyle className={`${className}`}>
        {Object.values(row).map((data, index) => (
          <span
            key={`${row.symbol}${index}`}
            className={`${tableHd[index].label}`}
            style={{ width: `${tableHd[index].ratio * 100}%` }}
          >
            {data}
          </span>
        ))}
      </ExecutionListStyle>
    );
  }
);

const ExecutionListStyle = styled.div``;

export default ExecutionList;
