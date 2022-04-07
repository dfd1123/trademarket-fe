import { useState } from 'react';
import styled from 'styled-components';
import { YellowTabStyle } from '@/views/components/common/tab/Tab';
import NewOrder from './newOrder/NewOrder';

const OrderBox = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <OrderBoxStyle>
      <YellowTabStyle
        list={['New Order', 'Stop/Limit', 'Modify/Cancel']}
        onChange={setTabIndex}
      />
      <div className="content-box">
          {tabIndex === 0 && (<NewOrder />)}
      </div>
    </OrderBoxStyle>
  );
};

const OrderBoxStyle = styled.div`
  width: 420px;

  ${YellowTabStyle} {
    width: 100%;
    height: 40px;
    .btn{
      font-size:14px;
    }
  }

  .content-box {
    height: 453px;
    padding: 14px 20px 10px 20px;
    background-color: #1e1f23;
  }
`;

export default OrderBox;
