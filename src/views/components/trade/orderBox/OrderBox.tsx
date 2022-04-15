import { useState } from 'react';
import styled from 'styled-components';
import { YellowTabStyle } from '@/views/components/common/tab/Tab';
import NewOrder from './newOrder/NewOrder';
import StopLimit from './StopLimit/StopLimit';
import ModifyCancel from './ModifyCancel/ModifyCancel';

interface PropsType {
  mobile?: boolean;
}

const OrderBox = ({mobile}:PropsType) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <OrderBoxStyle>
      <YellowTabStyle
        list={['New Order', 'Stop/Limit', 'Modify/Cancel']}
        onChange={setTabIndex}
      />
      <div className="content-box">
          {tabIndex === 0 && (<NewOrder />)}
          {tabIndex === 1 && (<StopLimit />)}
          {tabIndex === 2 && (<ModifyCancel />)}
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
    position:relative;
    height: 453px;
    padding: 14px 20px 10px 20px;
    background-color: #1e1f23;
  }
`;

export default OrderBox;
