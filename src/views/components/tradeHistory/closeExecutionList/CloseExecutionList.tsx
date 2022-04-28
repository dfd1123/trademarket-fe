import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { MyCloseTradeHistoryRowData, OpenOrderRowData } from '@/services/types/Trade';
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
  info: MyCloseTradeHistoryRowData;
}

const CloseExecutionList = React.memo(
  ({ className, tableHdInfo, info }: PropsType) => {
    const [tableHd, setTableHd] = useState(tableHdInfo);

    const row = useMemo(() => {
      const newInfo = { ...info };

      const pointPosition = newInfo.pointPosition;

      newInfo.openPrice = formatNumber(info.openPrice, pointPosition);
      newInfo.closePrice = formatNumber(info.closePrice, pointPosition);
      newInfo.side = translateSzPoCode(info.side, false);

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
      <CloseExecutionListStyle className={`${className}`}>
        {Object.values(row).map((data, index) => (
          <span
            key={`${row.symbol}${index}`}
            className={`${tableHd[index].label}`}
            style={{ width: `${tableHd[index].ratio * 100}%` }}
          >
            {data}
          </span>
        ))}
      </CloseExecutionListStyle>
    );
  }
);

const CloseExecutionListStyle = styled.div`
`;

export default CloseExecutionList;
