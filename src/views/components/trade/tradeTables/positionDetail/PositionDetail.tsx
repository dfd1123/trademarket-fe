import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TableHd from '../TableHd';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useService from '@/hooks/useService';
import TableBd from '../TableBd';
import PositionDetailList from './PositionDetailList';
import NoData from '../../../common/NoData';

interface PropsType {}

const tableHdLabel = [
  { label: 'Symbol', ratio: 0.07 },
  { label: 'Lot', ratio: 0.06 },
  { label: 'Side', ratio: 0.06 },
  { label: 'Price', ratio: 0.07 },
  { label: 'Current Price', ratio: 0.1 },
  { label: 'Price Diffrence', ratio: 0.12 }, // 50
  { label: 'Gross P&L', ratio: 0.08 },
  { label: 'Commission', ratio: 0.08 },
  { label: 'NetPL', ratio: 0.09 },
  { label: 'Point position', ratio: 0.12 },
  { label: 'Close positions', ratio: 0.15 },
];

const PositionDetail = () => {
  const services = useService();
  const { loading, noData, positionDetail, getPositionDetail } =
    services.trade.getPositionDetail();

  services.realTime.getMyConclusion();
  services.realTime.getMyNewOrder();

  useEffect(() => {
    getPositionDetail();
  }, []);

  return (
    <PositionDetailStyle>
      {!loading && (
        noData ? (
          <NoData msg="No data was retrieved" />
        ) : (
          <div>
            <TableHd list={tableHdLabel} />
            <TableBd>
              {positionDetail.map((row, index) => (
                <PositionDetailList
                  key={`row-${row.symbol}${index}`}
                  info={row}
                  tableHdInfo={tableHdLabel}
                />
              ))}
            </TableBd>
          </div>
        )
      )}
    </PositionDetailStyle>
  );
};

const PositionDetailStyle = styled.div`
  > div {
    min-width: 1020px;
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
  }
`;

export default PositionDetail;
