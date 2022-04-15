import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TABLET_SIZE } from '@/assets/styles/responsiveBreakPoint';
import { YellowTabStyle } from '@/views/components/common/tab/Tab';
import Margin from './Magin';
import Detail from './Detail';

interface PropsType {
    mobile?: boolean;
}

const MarginDetail = ({mobile} : PropsType) => {
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if(mobile) setTabIndex(0);
  }, [mobile]);

  return (
    <MarginDetailStyle>
      <div className="tab-cont">
        <YellowTabStyle list={['Margin', 'Detail']} onChange={setTabIndex} />
      </div>
      <div className="pannel-cont">
        {tabIndex === 0 && <Margin />}
        {tabIndex === 1 && <Detail />}
      </div>
    </MarginDetailStyle>
  );
};

const MarginDetailStyle = styled.div`
  width: 420px;
  .tab-cont {
    background-color: #33353b;
    ${YellowTabStyle} {
      height: 40px;
      .btn {
        width: 108px;
        padding: 0 10px;
        font-size: 14px;
      }
    }
  }
  .pannel-cont {
    height: 400px;
    padding: 25px 16px;
    background-color: #1e1f23;
  }
  @media (max-width: ${TABLET_SIZE}) {
    width: 100%;
    .tab-cont {
        display: none;
    }
  }
`;

export default MarginDetail;
