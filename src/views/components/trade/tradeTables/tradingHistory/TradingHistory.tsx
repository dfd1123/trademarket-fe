import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TableHd from '../TableHd';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useService from '@/hooks/useService';
import TableBd from '../TableBd';
import TradeHistoryList from './TradeHistoryList';
import { useTypedSelector } from '@/store';
import { getDiffDate } from '@/utils/dateUtils';
import NoData from '../../../common/NoData';

interface PropsType {}

const tableHdLabel = [
  { label: 'Order No', ratio: 0.09 },
  { label: 'Execution No', ratio: 0.08 },
  { label: 'Symbol', ratio: 0.08 },
  { label: 'Order Lot', ratio: 0.08 },
  { label: 'Execution Lot', ratio: 0.09 },
  { label: 'Order Kinds	', ratio: 0.08 }, // 50
  { label: 'Order Price', ratio: 0.08 },
  { label: 'Execution Price	', ratio: 0.08 },
  { label: 'Order Type', ratio: 0.08 },
  { label: 'Order Time', ratio: 0.08 },
  { label: 'Execution Time', ratio: 0.09 },
  { label: 'Point position', ratio: 0.09 },
];

const TradingHistory = () => {
  const services = useService();
  const { loading, noData, myTradeHistory, getMyTradeHistory } =
    services.trade.getMyTradeHistory();

  const myConclusion = useTypedSelector(
    (state) => state.realTimeData.myConclusion
  );

  const [endDate, setEndDate] = useState(new Date());

  services.realTime.getMyConclusion();

  const getHistory = async () => {
    const startDate = getDiffDate(endDate, 1);

    await getMyTradeHistory(startDate, endDate);

    setEndDate(startDate);
  }

  useEffect(() => {
    if(noData){
      getHistory();
    }else{
      getHistory();
    }
  }, [myConclusion, noData]);

  return (
    <TradingHistoryStyle>
      {!loading &&
        (noData ? (
          <NoData msg="No data was retrieved" />
        ) : (
          <div>
            <TableHd list={tableHdLabel} />
            <TableBd>
              {myTradeHistory.map((row, index) => (
                <TradeHistoryList
                  key={`row-${row.symbol}${index}`}
                  info={row}
                  tableHdInfo={tableHdLabel}
                />
              ))}
            </TableBd>
          </div>
        ))}
    </TradingHistoryStyle>
  );
};

const TradingHistoryStyle = styled.div`
  > div {
    min-width: 1280px;
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
  }
`;

export default TradingHistory;
