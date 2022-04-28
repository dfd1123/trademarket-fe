import React, { useState } from 'react';
import styled from 'styled-components';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import NoData from '../common/NoData';

interface PropsType {
  children: React.ReactNode;
}

const TradeTables = ({children} : PropsType) => {
  return (
    <TradeTablesStyle>
        <div className="tables-cont">
          {children}
        </div>
    </TradeTablesStyle>
  );
};

const TradeTablesStyle = styled.div`
  margin-right: 5px;

  .tables-cont {
    > div {
      height: 400px;
      background-color: #010b15;
      overflow-x: scroll;
    }
  }

  ${NoData}{
    background-color: #010b15;
  }

  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
    margin-bottom: 5px;
    .tables-cont {
      > div {
        height: 350px;
      }
    }
  }
`;

export default TradeTables;
