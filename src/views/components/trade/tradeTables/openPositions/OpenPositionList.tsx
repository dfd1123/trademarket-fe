import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import { TradeInfoContext } from '@/provider/TradeInfoProvider';
import { translateSzPoCode } from '@/utils/translateUtils';

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
    const context = useContext(TradeInfoContext);
    const { setOrder } = context;
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

        newInfo.orderNo = info.orderNo.slice(15, 21);
        newInfo.side = translateSzPoCode(info.side, false)
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

    const rowClickHandler = (label: string) => {
      label = label.trim();

      if(label === 'currentprice'){
        setOrder({
          type: 'modifyCancel',
          price: info.price,
          amount: info.lot,
          limitPrice: Number(info.limit ?? 0),
          orderType: 'UCEL',
          symbol: info.symbol,
          dealType: info.side,
          modType: '0',
          limitNo: info.limitNo,
          orderNo: info.orderNo,
        });
      } else if(label === 'stop'){
        setOrder({
          type: info.stop ? 'modifyCancel' : 'stopLimit',
          price: info.price,
          amount: info.lot,
          stopPrice: Number(info.stop || info.price),
          orderType: 'UCES',
          symbol: info.symbol,
          dealType: info.side,
          modType: info.stop ? '0' : '4',
          stopNo: info.stopNo,
          orderNo: info.orderNo,
        });
      } else if(label === 'limit'){
        setOrder({
          type: info.limit ? 'modifyCancel' : 'stopLimit',
          price: info.price,
          amount: info.lot,
          limitPrice: Number(info.limit || info.price),
          orderType: 'UCEL',
          symbol: info.symbol,
          dealType: info.side,
          modType: info.limit ? '0' : '4',
          limitNo: info.limitNo,
          orderNo: info.orderNo,
        });
      }else {
        setOrder({
          type: 'stopLimit',
          price: info.price,
          amount: info.lot,
          orderType: 'UCM',
          symbol: info.symbol,
          dealType: info.side,
          modType: '4',
          orderNo: info.orderNo,
        });
      }
    }

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
            onClick={() => rowClickHandler(tableHd[index].label)}
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
