import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import useService from '@/hooks/useService';
import { YellowTab } from '@/views/components/common/tab/Tab';
import OrderTable from './OrderTable';
import SimpleTradeHistory from './SimpleTradeHistory';

const OrderBooks = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <OrderBookStyle>
      <YellowTab list={['Order Book', 'Trades']} onChange={setTabIndex} />
      <div className="content-box">
        {tabIndex === 0 ? <OrderTable /> : <SimpleTradeHistory />}
      </div>
    </OrderBookStyle>
  );
};

const OrderBookStyle = styled.div`
  width: 290px;
  margin: 0 5px;

  ${YellowTab} {
    width: 100%;
    height: 40px;

    .btn{
      font-size:14px;
    }
  }

  .content-box {
    height: 453px;
    background-color: #1e1f23;

    /* > div {
      display: none;
      &.active {
        display: block;
      }
    } */
  }
`;

export default OrderBooks;
