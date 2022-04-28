import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { YellowTab } from '@/views/components/common/tab/Tab';
import Chart from '@/views/components/trade/chart/Chart';
import NewOrder from '@/views/components/trade/orderBox/newOrder/NewOrder';
import ModifyCancel from '@/views/components/trade/orderBox/ModifyCancel/ModifyCancel';
import StopLimit from '@/views/components/trade/orderBox/StopLimit/StopLimit';
import { TradeInfoContext } from '@/provider/TradeInfoProvider';

const MobileChartLine = () => {
  const context = useContext(TradeInfoContext);
  const { order, setOrder } = context;
  const [clickAction, setClickAction] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const changeTabIndex = (index: number) => {
    setTabIndex(index);
  };

  const clickTab = () => {
    setClickAction(true);
    setOrder(null);
    setTimeout(() => {
      setClickAction(false);
    }, 10);
  };

  useEffect(() => {
    if (order) {
      const { type } = order;

      switch (type) {
        case 'newOrder':
          setTabIndex(1);
          break;

        case 'stopLimit':
          setTabIndex(2);
          break;

        case 'modifyCancel':
          setTabIndex(3);
          break;

        default:
          setTabIndex(1);
          break;
      }
    }else{
      if(!clickAction) setTabIndex(1);
    }
  }, [order]);

  return (
    <MobileChartLineStyle>
      <YellowTab
        list={['Chart', 'Order', 'Stop/Limit', 'Modify/Cancel']}
        selected={tabIndex}
        onClick={clickTab}
        onChange={changeTabIndex}
      />
      <div>
        {Boolean(tabIndex === 0) && <Chart />}
        {Boolean(tabIndex === 1) && <NewOrder mobile={true} />}
        {Boolean(tabIndex === 2) && <StopLimit />}
        {Boolean(tabIndex === 3) && <ModifyCancel />}
      </div>
    </MobileChartLineStyle>
  );
};

const MobileChartLineStyle = styled.div`
  background-color: #1e1f23;
  ${YellowTab} {
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
