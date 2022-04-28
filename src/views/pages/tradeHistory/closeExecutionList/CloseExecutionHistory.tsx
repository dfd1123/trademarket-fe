import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { useTypedSelector } from '@/store';
import useService from '@/hooks/useService';
import NoData from '@/views/components/common/NoData';
import TradeTables from '@/views/components/tradeHistory/TradeTables';
import TableBd from '@/views/components/tradeHistory/TableBd';
import TableHd from '@/views/components/tradeHistory/TableHd';
import CloseExecutionList from '@/views/components/tradeHistory/closeExecutionList/CloseExecutionList';
import { HistoryOutletContext } from '@/views/pages/tradeHistory/History';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {}

const tableHdLabel = [
  { label: 'Execution No', ratio: 0.066 },
  { label: 'Account No', ratio: 0.066 },
  { label: 'Symbol', ratio: 0.066 },
  { label: 'Close Lot', ratio: 0.066 },
  { label: 'Open Time', ratio: 0.066 },
  { label: 'Close Time	', ratio: 0.066 },
  { label: 'Order Price', ratio: 0.066 },
  { label: 'Close Price	', ratio: 0.066 },
  { label: 'P&L Price', ratio: 0.066 },
  { label: 'P&L', ratio: 0.066 },
  { label: 'Open Commision', ratio: 0.066 },
  { label: 'Close Commision', ratio: 0.066 },
  { label: 'Order Type', ratio: 0.066 },
  { label: 'Side', ratio: 0.066 },
  { label: 'Point Position', ratio: 0.066 },
];

const CloseExecutionHistory = () => {
  const { date } = useOutletContext<HistoryOutletContext>();
  const services = useService();
  const { loading, noData, myCloseTradeHistory, getMyCloseTradeHistory } =
    services.trade.getCloseExcutionHistory();

  // const myConclusion = useTypedSelector(
  //   (state) => state.realTimeData.myConclusion
  // );

  const getHistory = async () => {
    const dateParam =new Date(date);
    await getMyCloseTradeHistory(dateParam);
  };

  useEffect(() => {
    getHistory();
  }, [date]);

  return (
    <CloseExecutionHistoryStyle>
      <TradeTables>
      {!loading &&
        (noData ? (
          <NoData msg="No data was retrieved" />
        ) : (
        <div>
            <TableHd list={tableHdLabel} />
            <TableBd>
              {myCloseTradeHistory.map((row, index) => (
                <CloseExecutionList
                  key={`row-${row.symbol}${index}`}
                  info={row}
                  tableHdInfo={tableHdLabel}
                />
              ))}
            </TableBd>
          </div>
        ))}
      </TradeTables>
    </CloseExecutionHistoryStyle>
  );
};

const CloseExecutionHistoryStyle = styled.div`

.tables-cont {
  overflow: scroll;
  > div{
    min-width: 1680px;
  }
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
  }
`;

export default CloseExecutionHistory;
