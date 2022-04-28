import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { useTypedSelector } from '@/store';
import useService from '@/hooks/useService';
import NoData from '@/views/components/common/NoData';
import TradeTables from '@/views/components/tradeHistory/TradeTables';
import TableBd from '@/views/components/tradeHistory/TableBd';
import TableHd from '@/views/components/tradeHistory/TableHd';
import ExecutionList from '@/views/components/tradeHistory/executionList/ExecutionList';
import { HistoryOutletContext } from '@/views/pages/tradeHistory/History';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {}

const tableHdLabel = [
  { label: 'Order No', ratio: 0.08 },
  { label: 'Execution No', ratio: 0.08 },
  { label: 'Symbol', ratio: 0.08 },
  { label: 'Order Lot', ratio: 0.08 },
  { label: 'Execution Lot', ratio: 0.08 },
  { label: 'Order Kinds	', ratio: 0.08 }, // 50
  { label: 'Order Price', ratio: 0.08 },
  { label: 'Execution Price	', ratio: 0.08 },
  { label: 'Order Type', ratio: 0.08 },
  { label: 'Order Time', ratio: 0.1 },
  { label: 'Execution Time', ratio: 0.09 },
  { label: 'Point position', ratio: 0.09 },
];

const ExecutionHistory = () => {
  const { dateRange } = useOutletContext<HistoryOutletContext>();
  const services = useService();
  const { loading, noData, myTradeHistory, getMyTradeHistory } =
    services.trade.getMyTradeHistory();

  // const myConclusion = useTypedSelector(
  //   (state) => state.realTimeData.myConclusion
  // );

  const getHistory = async () => {
    const startDate =new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    await getMyTradeHistory(startDate, endDate);
  };

  useEffect(() => {
    getHistory();
  }, [dateRange]);

  return (
    <ExecutionHistoryStyle>
      <TradeTables>
      {!loading &&
        (noData ? (
          <NoData msg="No data was retrieved" />
        ) : (
        <div>
            <TableHd list={tableHdLabel} />
            <TableBd>
              {myTradeHistory.map((row, index) => (
                <ExecutionList
                  key={`row-${row.symbol}${index}`}
                  info={row}
                  tableHdInfo={tableHdLabel}
                />
              ))}
            </TableBd>
          </div>
        ))}
      </TradeTables>
    </ExecutionHistoryStyle>
  );
};

const ExecutionHistoryStyle = styled.div`

.tables-cont {
  overflow: scroll;
  > div{
    min-width: 1280px;
  }
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
  }
`;

export default ExecutionHistory;
