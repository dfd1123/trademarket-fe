import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import { useTypedSelector } from '@/store';
import useService from '@/hooks/useService';
import NoData from '@/views/components/common/NoData';
import TradeTables from '@/views/components/tradeHistory/TradeTables';
import TableBd from '@/views/components/tradeHistory/TableBd';
import TableHd from '@/views/components/tradeHistory/TableHd';
import OrderDetailList from '@/views/components/tradeHistory/orderDetailExecutionList/OrderDetailList';
import { HistoryOutletContext } from '@/views/pages/tradeHistory/History';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {}

const tableHdLabel = [
  { label: 'Order No', ratio: 0.07 },
  { label: 'Execution No', ratio: 0.07 },
  { label: 'Symbol', ratio: 0.07 },
  { label: 'Side', ratio: 0.07 },
  { label: 'Lot', ratio: 0.07 },
  { label: 'Order Price	', ratio: 0.07 }, // 50
  { label: 'Stop Price', ratio: 0.07 },
  { label: 'Limit Price	', ratio: 0.07 },
  { label: 'Order Kind', ratio: 0.07 },
  { label: 'Order Type', ratio: 0.07 },
  { label: 'Stat', ratio: 0.07 },
  { label: 'Order Time', ratio: 0.07 },
  { label: 'Manage ID', ratio: 0.07 },
  { label: 'IP Address', ratio: 0.08 },
];

const OrderDetailHistory = () => {
  const { dateRange } = useOutletContext<HistoryOutletContext>();
  const services = useService();
  const { loading, noData, myDetailTradeHistory, getMyDetailTradeHistory } =
    services.trade.getMyDetailTradeHistory();

  // const myConclusion = useTypedSelector(
  //   (state) => state.realTimeData.myConclusion
  // );

  const getDetailHistory = () => {
    const startDate =new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);
    getMyDetailTradeHistory(startDate, endDate);
  };

  useEffect(() => {
    getDetailHistory();
  }, [dateRange]);

  return (
    <OrderDetailHistoryStyle>
      <TradeTables>
      {!loading &&
        (noData ? (
          <NoData msg="No data was retrieved" />
        ) : (
        <div>
            <TableHd list={tableHdLabel} />
            <TableBd>
              {myDetailTradeHistory.map((row, index) => (
                <OrderDetailList
                  key={`row-${row.symbol}${index}`}
                  info={row}
                  tableHdInfo={tableHdLabel}
                />
              ))}
            </TableBd>
          </div>
        ))}
      </TradeTables>
    </OrderDetailHistoryStyle>
  );
};

const OrderDetailHistoryStyle = styled.div`

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

export default OrderDetailHistory;
