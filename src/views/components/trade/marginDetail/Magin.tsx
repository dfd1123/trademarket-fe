import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTypedSelector } from '@/store';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import useService from '@/hooks/useService';
import { formatNumber } from '@/utils/numberUtils';
import { UserMarginData } from '@/services/types/User';

interface PropsType {
  info: UserMarginData;
}

const Margin = ({info}: PropsType) => {
  const services = useService();

  const userInfo = useTypedSelector((state) => state.authSlice);


  return (
    <MarginStyle>
      {userInfo.isLoggedIn ? (
        <>
          <div className="pannel">
            <span className="label">Balance</span>
            <span className="value">{info.balance}</span>
          </div>
          <div className="pannel">
            <span className="label">Open Position Margin</span>
            <span className="value">{info.openPositionMargin}</span>
          </div>
          <div className="pannel">
            <span className="label">Gross P&L</span>
            <span className="value">{info.grossPnL}</span>
          </div>
          <div className="pannel">
            <span className="label">Valuation Equity</span>
            <span className="value">{info.possibleWithdraw}</span>
          </div>
          <div className="pannel">
            <span className="label">Required Order Margin</span>
            <span className="value">{info.maintenMargin}</span>
          </div>
          <div className="pannel">
            <span className="label">Maintenance Position Margin</span>
            <span className="value">{info.marginForUse}</span>
          </div>
          <div className="pannel">
            <span className="label">Available Margin</span>
            <span className="value">{info.availableMargin}</span>
          </div>
          <div className="pannel">
            <span className="label">Margin Call rate(%)</span>
            <span className="value">{info.marginCallRate}</span>
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
