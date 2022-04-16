import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useService from '@/hooks/useService';
import { formatNumber } from '@/utils/numberUtils';

const Margin = () => {
  const services = useService();

  const userInfo = useTypedSelector((state) => state.authSlice);
  const myConclusion = useTypedSelector(
    (state) => state.realTimeData.myConclusion
  );
  const myNewOrder = useTypedSelector(
    (state) => state.realTimeData.myNewOrder
  );

  const { marginData, getMarginData } = services.user.getUserMarginData();

  useEffect(() => {
    getMarginData()
  }, [myConclusion, myNewOrder]);

  useEffect(() => {
    getMarginData()
  }, []);


  return (
    <MarginStyle>
      {userInfo.isLoggedIn ? (
        <>
          <div className="pannel">
            <span className="label">Balance</span>
            <span className="value">{marginData.balance}</span>
          </div>
          <div className="pannel">
            <span className="label">Open Position Margin</span>
            <span className="value">{marginData.openPositionMargin}</span>
          </div>
          <div className="pannel">
            <span className="label">Gross P&L</span>
            <span className="value">{marginData.grossPnL}</span>
          </div>
          <div className="pannel">
            <span className="label">Valuation Equity</span>
            <span className="value">{marginData.possibleWithdraw}</span>
          </div>
          <div className="pannel">
            <span className="label">Required Order Margin</span>
            <span className="value">{marginData.maintenMargin}</span>
          </div>
          <div className="pannel">
            <span className="label">Maintenance Position Margin</span>
            <span className="value">{marginData.marginForUse}</span>
          </div>
          <div className="pannel">
            <span className="label">Available Margin</span>
            <span className="value">{marginData.availableMargin}</span>
          </div>
          <div className="pannel">
            <span className="label">Margin Call rate(%)</span>
            <span className="value">{marginData.marginCallRate}</span>
          </div>
        </>
      ) : (
        <div className="please-login">
          <p>Please log in.</p>
        </div>
      )}
    </MarginStyle>
  );
};

const MarginStyle = styled.div`
  .pannel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;

    > span {
      font-size: 13px;
      line-height: 18px;
      color: #fff;
    }
  }

  .please-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 350px;
    background-color: #1e1f23;

    > p {
      font-size: 12px;
      color: #ddd;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
  }
`;

export default Margin;
