import React, { useEffect } from 'react';
import styled from 'styled-components';
import TableHd from '../TableHd';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useService from '@/hooks/useService';
import OpenOrderList from './OpenOrderList';
import TableBd from '../TableBd';

interface PropsType {}

const tableHdLabel = [
  { label: 'Order No', ratio: 0.09 },
  { label: 'Symbol', ratio: 0.09 },
  { label: 'Side', ratio: 0.09 },
  { label: 'Price', ratio: 0.09 },
  { label: 'Lot', ratio: 0.09 },
  { label: 'Current Price', ratio: 0.09 }, // 50
  { label: 'Stop', ratio: 0.09 },
  { label: 'Limit', ratio: 0.09 },
  { label: 'CROSS/ISO', ratio: 0.09 },
  { label: 'Order Time', ratio: 0.09 },
  { label: 'Leverage', ratio: 0.09 },
];

const OpenOrders = () => {
  const services = useService();
  const {openOrders, getOpenOrders} = services.trade.getOpenOrders();

  useEffect(() => {
    getOpenOrders();
  }, []);
  
  return (
    <OpenOrdersStyle>
      <div>
        <TableHd list={tableHdLabel} />
        <TableBd>
          {openOrders.map(row => (
            <OpenOrderList info={row} tableHdInfo={tableHdLabel} />
          ))}
        </TableBd>
      </div>
    </OpenOrdersStyle>
  );
};

const OpenOrdersStyle = styled.div`
  > div {
    min-width: 1020px;
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
  }
`;

export default OpenOrders;
