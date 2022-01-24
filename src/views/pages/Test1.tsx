import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import useReqRealTimePrice from '@/hooks/realTime/useReqRealTimePrice';
import useGetRealTimePrice from '@/hooks/realTime/useGetRealTimePrice';


function Test1() {
  useReqRealTimePrice();

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
