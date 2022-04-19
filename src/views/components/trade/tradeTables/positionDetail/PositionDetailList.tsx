import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PointPositionRowData } from '@/services/types/Trade';
import { NoBorderButton } from '@/views/components/common/Button';
import useCurrentSymbol from '@/hooks/useCurrentSymbol';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import { DOWN_COLOR, UP_COLOR } from '@/data/colorData';
import useService from '@/hooks/useService';

interface PropsType {
  className?: string;
  tableHdInfo: {
    label: string;
    ratio: number;
  }[];
  info: PointPositionRowData;
}

const PositionDetailList = React.memo(
  ({ className, tableHdInfo, info }: PropsType) => {
    const lastTdData = tableHdInfo[tableHdInfo.length - 1];

    const services = useService();
    const { close } = useCurrentSymbol(info.symbol);

    const { sellNewOrder, buyNewOrder } = services.trade.reqNewOrder(
      info.symbol
    );

    const [tableHd, setTableHd] = useState(tableHdInfo);
    const [upDown, setUpDown] = useState<'' | 'up' | 'down'>('');

    const row = useMemo(() => {
      const newInfo = { ...info };
      const pointPosition = newInfo.pointPosition;
      const currentPrice = unformatNumber(close ?? '0');

      if (close) {
        if (info.side === 'Buy') {
          newInfo.priceDiffrence = currentPrice - Number(newInfo.price);
        } else {
          newInfo.priceDiffrence = Number(newInfo.price) - currentPrice;
        }

        if (newInfo.priceDiffrence > 0) setUpDown('up');
        else setUpDown('down');

        newInfo.grossPnL = newInfo.priceDiffrence * newInfo.lot;
        newInfo.netPl = newInfo.grossPnL - Number(newInfo.commision);

        newInfo.currentPrice = formatNumber(currentPrice, pointPosition);
        newInfo.priceDiffrence = formatNumber(
          newInfo.priceDiffrence,
          pointPosition
        );
        newInfo.grossPnL = formatNumber(newInfo.grossPnL, pointPosition);
        newInfo.netPl = formatNumber(newInfo.netPl, pointPosition);
      }

      return newInfo;
    }, [info, close]);

    const closePosition = useCallback(() => {
      const params = {
        price: info.price,
        amount: info.lot,
        orderType: 'UOM',
        marginType: '0',
        leverage: '10',
      };

      if (info.side === 'Buy') sellNewOrder(params);
      else buyNewOrder(params);
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
      <PositionDetailListStyle className={`${className} ${upDown}`}>
        {Object.values(row).map((data, index) => (
          <span
            key={`${row.symbol}${index}`}
            className={`${tableHd[index].label}`}
            style={{ width: `${tableHd[index].ratio * 100}%` }}
          >
            {data}
          </span>
        ))}
        <span style={{ width: `${lastTdData.ratio * 100}%` }}>
          <NoBorderButton onClick={closePosition}>
            Close positions
          </NoBorderButton>
        </span>
      </PositionDetailListStyle>
    );
  }
);

const PositionDetailListStyle = styled.div`
  &.up {
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
  }

  ${NoBorderButton} {
    width: 137px;
    height: 36px;
    background-color: #1976d2;

    button {
      font-size: 12px;
      color: #fff;
    }
  }
`;

export default PositionDetailList;
