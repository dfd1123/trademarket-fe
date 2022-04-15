import React, { useState } from 'react';
import styled from 'styled-components';
import TableHd from '../TableHd';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';

interface PropsType {}

const tableHdLabel = [
  { label: 'Ticket No', ratio: 0.055 },
  { label: 'Symbol', ratio: 0.045 },
  { label: 'Side', ratio: 0.045 },
  { label: 'Price', ratio: 0.05 },
  { label: 'Lot', ratio: 0.04 },
  { label: 'Current Price	', ratio: 0.055 }, // 50
  { label: 'Stop', ratio: 0.04 },
  { label: 'Limit', ratio: 0.04 },
  { label: 'Price Difference', ratio: 0.07 },
  { label: 'Gross P&L', ratio: 0.05 },
  { label: 'Leverage', ratio: 0.05 },
  { label: 'CROSS/ISO', ratio: 0.045 },
  { label: 'Market', ratio: 0.05 },
  { label: 'Order Time', ratio: 0.075 },
  { label: 'Order No', ratio: 0.075 },
  { label: 'Stop No', ratio: 0.075 },
  { label: 'Limit No', ratio: 0.075 },
  { label: 'Business Date', ratio: 0.06 },
];

const OpenPositions = () => {
  return (
    <OpenPositionsStyle>
      <div>
        <TableHd list={tableHdLabel} />
      </div>
    </OpenPositionsStyle>
  );
};

const OpenPositionsStyle = styled.div`
  > div {
    min-width: 1700px;
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
  }
`;

export default OpenPositions;
