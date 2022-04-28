import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { YellowTab } from '@/views/components/common/tab/Tab';
import NewOrder from './newOrder/NewOrder';
import StopLimit from './StopLimit/StopLimit';
import ModifyCancel from './ModifyCancel/ModifyCancel';
import { TradeInfoContext } from '@/provider/TradeInfoProvider';

interface PropsType {
  mobile?: boolean;
}

const OrderBox = ({ mobile }: PropsType) => {
  const context = useContext(TradeInfoContext);
  const { order, setOrder } = context;

  const [tabIndex, setTabIndex] = useState(0);

  const changeTabIndex = (index: number) => {
    setTabIndex(index);
  };

  const clickTab = () => {
    setOrder(null);
  };

  useEffect(() => {
    if (order) {
      const { type } = order;

      switch (type) {
        case 'newOrder':
          setTabIndex(0);
          break;

        case 'stopLimit':
          setTabIndex(1);
          break;

        case 'modifyCancel':
          setTabIndex(2);
          break;

        default:
          setTabIndex(0);
          break;
      }
    }else{
      setTabIndex(0);
    }
  }, [order]);

  return (
    <OrderBoxStyle>
      <YellowTab
        list={['New Order', 'Stop/Limit', 'Modify/Cancel']}
        selected={tabIndex}
        onClick={clickTab}
        onChange={changeTabIndex}
      />
      <div className="content-box">
        {tabIndex === 0 && <NewOrder />}
        {tabIndex === 1 && <StopLimit />}
        {tabIndex === 2 && <ModifyCancel />}
      </div>
    </OrderBoxStyle>
  );
};

const OrderBoxStyle = styled.div`
  width: 420px;

  ${YellowTab} {
    width: 100%;
    height: 40px;
    .btn {
      font-size: 14px;
    }
  }

  .content-box {
    position: relative;
    height: 453px;
    padding: 14px 20px 10px 20px;
    background-color: #1e1f23;
  }
`;

export default OrderBox;
