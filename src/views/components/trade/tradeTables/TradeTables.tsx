import React, { useState } from 'react';
import styled from 'styled-components';
import { YellowTabStyle } from '@/views/components/common/tab/Tab';
import PositionDetail from './positionDetail/PositionDetail';
import OpenOrders from './openOrders/OpenOrders';
import TradingHistory from './tradingHistory/TradingHistory';
import OpenPositions from './openPositions/OpenPositions';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { useTypedSelector } from '@/store';

interface PropsType {}

const TradeTables = () => {
  const userInfo = useTypedSelector((state) => state.authSlice);
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <TradeTablesStyle>
      <YellowTabStyle
        list={[
          'Position Detail',
          'Open Orders',
          'Trading History',
          'Open Position',
        ]}
        onChange={setTabIndex}
      />
      {userInfo.isLoggedIn ? (
        <div className="tables-cont">
          {tabIndex === 0 && <PositionDetail />}
          {tabIndex === 1 && <OpenOrders />}
          {tabIndex === 2 && <TradingHistory />}
          {tabIndex === 3 && <OpenPositions />}
        </div>
      ) : (
        <div className="please-login">
          <p>Please log in.</p>
        </div>
      )}
    </TradeTablesStyle>
  );
};

const TradeTablesStyle = styled.div`
  width: calc(100% - 425px);
  margin-right: 5px;
  ${YellowTabStyle} {
    width: 100%;
    height: 40px;

    .btn {
      padding: 0 10px;
      font-size: 14px;
    }
  }

  .tables-cont {
    > div {
      height: 400px;
      background-color: #1e1f23;
      overflow-x: scroll;
    }
  }

  .please-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    background-color: #1e1f23;

    > p {
      font-size: 12px;
      color: #ddd;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
    margin-bottom: 5px;
    .tables-cont {
      > div {
        height: 350px;
      }
    }
    
    .please-login {
        height: 350px;
    }

    ${YellowTabStyle} {
      white-space: break-spaces;
      .btn {
        padding: 0 10px;
        font-size: 12px;
      }
    }
  }
`;

export default TradeTables;
