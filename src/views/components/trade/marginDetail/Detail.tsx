import React, { useState } from 'react';
import styled from 'styled-components';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { useParams } from 'react-router';
import { useTypedSelector } from '@/store';

const Detail = () => {
  const { symbol } = useParams();
  const info = useTypedSelector(
    (state) => state.coinInfoSlice.symbols[symbol as string]
  );

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <DetailStyle>
      <div className="pannel">
        <span className="label">Symbol Name</span>
        <span className="value">{info.NAME_ENG}</span>
      </div>
      <div className="pannel">
        <span className="label">Trade Type</span>
        <span className="value">{info.TRADE_TYPE}</span>
      </div>
      <div className="pannel">
        <span className="label">Market Open Time</span>
        <span className="value">{info.ST_TIME}</span>
      </div>
      <div className="pannel">
        <span className="label">Market Close Time</span>
        <span className="value">{info.ED_TIME}</span>
      </div>
      <div className="pannel">
        <span className="label">Maximum Lots</span>
        <span className="value">{info.MAX_ORDCNT}</span>
      </div>
      <div className="pannel">
        <span className="label">Minimum Lots</span>
        <span className="value">{info.MIN_ORDCNT}</span>
      </div>
      <div className="pannel">
        <span className="label">Point Position</span>
        <span className="value">{info.PIP_LOWEST}</span>
      </div>
      <div className="pannel">
        <span className="label">Pip Value</span>
        <span className="value">{info.PIP_COST}</span>
      </div>
      <div className="pannel">
        <span className="label">Order Stat</span>
        <span className="value">{info.ORDER_STAT}</span>
      </div>
    </DetailStyle>
  );
};

const DetailStyle = styled.div`
  .pannel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;

    > span {
      font-size: 13px;
      line-height: 18px;
      color: #fff;
    }
  }

  @media (max-width: ${TABLET_SIZE}) {
  }
`;

export default Detail;
