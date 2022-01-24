import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import { useTypedSelector } from '@/store';
import useRealTimePriceReq from '@/hooks/realTime/useRealTimePriceReq';
import useGetRealTimePrice from '@/hooks/realTime/useGetRealTimePrice';


function Test1() {
  useRealTimePriceReq();

  const test = useGetRealTimePrice('BTCUSDT');

  return (
    <div>
      <h1>TEST1</h1>
      <p>{test}</p>
      <button>
        <Link to='/test2'>테스트2</Link>
      </button>
    </div>
  );
}

export default Test1;
