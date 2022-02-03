import React, { useContext } from 'react';
import {Link, Outlet} from 'react-router-dom';
import realTime from '@/services/RealTimeService';
import useGetRealTimePrice from '@/hooks/useGetRealTimePrice';
import useModal from '@/hooks/useModal';
import TestModal from '@/views/components/common/modal/Test';
import { ModalContext } from '@/provider/ModalProvider';


function Test1() {
  realTime.coinPrice();
  const {open} = useContext(ModalContext);

  const openTestModal = () => {
    open(TestModal);
  }

  const test = useGetRealTimePrice('BTCUSDT');

  return (
    <div>
      <h1>TEST1</h1>
      <p>{test}</p>
      <button>
        <Link to='/test2'>테스트2</Link>
      </button>
      <button onClick={openTestModal}>모달 테스트</button>
    </div>
  );
}

export default Test1;
