import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import realTime from '@/services/RealTimeService';
import useGetRealTimePrice from '@/hooks/useGetRealTimePrice';


function Test1() {
  realTime.coinPrice();

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
