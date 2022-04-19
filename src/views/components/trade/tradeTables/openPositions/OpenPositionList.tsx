import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { OpenPositionRowData } from '@/services/types/Trade';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import {
  DOWN_COLOR,
  LIMIT_COLOR,
  STOP_COLOR,
  UP_COLOR,
} from '@/data/colorData';
import useService from '@/hooks/useService';

interface PropsType {
  className?: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info: OpenPositionRowData;
}

const OpenPositionList = React.memo(
  ({ className, tableHdInfo, info }: PropsType) => {
    const services = useService();
    const { close, pipLowest } = useCurrentSymbol(info.symbol);

    services.realTime.getMyConclusion();
    services.realTime.getMyStopLimitOrder();

    const [tableHd, setTableHd] = useState(tableHdInfo);
    const [upDown, setUpDown] = useState<'up' | 'down'>('up');

    const row = useMemo(() => {
      const newInfo = { ...info };
      const pointPosition = pipLowest;
      const currentPrice = unformatNumber(close ?? '0');

      if (close) {
        if (info.side === 'Buy') {
          newInfo.priceDiffrence = currentPrice - Number(newInfo.price);
        } else {
          newInfo.priceDiffrence = Number(newInfo.price) - currentPrice;
        }

        if (newInfo.priceDiffrence > 0) setUpDown('up');
        else setUpDown('down');

        newInfo.grossPnl = newInfo.priceDiffrence * newInfo.lot;

        newInfo.price = formatNumber(info.price, pointPosition);
        newInfo.stop = formatNumber(info.stop, pointPosition);
        newInfo.limit = formatNumber(info.limit, pointPosition);
        newInfo.currentPrice = formatNumber(currentPrice, pointPosition);
        newInfo.priceDiffrence = formatNumber(
          newInfo.priceDiffrence,
          pointPosition
        );
        newInfo.grossPnl = formatNumber(newInfo.grossPnl, pointPosition);
      }

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
      <OpenPositionListStyle className={`${className} ${upDown}`}>
        {Object.values(row).map((data, index) => (
          <span
            key={`${row.symbol}${index}`}
            className={`${tableHd[index].label}`}
            style={{ width: `${tableHd[index].ratio * 100}%` }}
          >
            {data}
          </span>
        ))}
      </OpenPositionListStyle>
    );
  }
);

const OpenPositionListStyle = styled.div`
  /* &.up {
    .pricediffrence,
    .grosspl,
    .netpl {
      color: ${UP_COLOR} !important;
    }
  }

  &.down {
    .pricediffrence,
    .grosspl,
    .netpl {
      color: ${DOWN_COLOR} !important;
    }
  } */

  span {
    padding: 15px 0 !important;
  }

  .stop,
  .market {
    color: ${STOP_COLOR} !important;
  }

  .limit {
    color: ${LIMIT_COLOR} !important;
  }

  .currentprice,
  .lot,
  .stop,
  .limit,
  .market {
    cursor: pointer;
  }
`;

export default OpenPositionList;
