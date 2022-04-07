import { useState } from 'react';
import styled from 'styled-components';
import { YellowTabStyle } from '@/views/components/common/tab/Tab';
import Chart from '@/views/components/trade/chart/Chart';
import NewOrder from '@/views/components/trade/orderBox/newOrder/NewOrder';

const MobileChartLine = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <MobileChartLineStyle>
      <YellowTabStyle
        list={['Chart', 'Order', 'Stop/Limit', 'Modify/Cancel']}
        onChange={setTabIndex}
      />
      <div>
        {Boolean(tabIndex === 0) && (<Chart />)}
        {Boolean(tabIndex === 1) && (<NewOrder />)}
      </div>
    </MobileChartLineStyle>
  );
};

const MobileChartLineStyle = styled.div`
  ${YellowTabStyle} {
    width: 100%;
    height: 40px;

    .btn {
      width: auto;
      padding: 0 3%;
      font-size: 14px;
    }
  }
`;

export default MobileChartLine;
