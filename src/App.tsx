import {useEffect, useState} from 'react';
// import { Provider } from 'react-redux';
import RouterView from '@/router';
import socketService from '@/modules/SocketService';
import {TransactionInputType} from '@/types/TransactionType';

function App() {
  useEffect(() => {
    socketService.init();

    const input : TransactionInputType = {
      Header: {
        function: 'A',
        termtype: 'HTS',
        trcode: '91',
      },
      Input1: {
        Key1: "BTCUSDT",
        Key2: "ETHUSDT",
        Key3: "XRPUSDT",
        Key4: "DOGEUSDT"
      },
    };

    setTimeout(() => {
      socketService.liveSend(input)
    }, 2000);
  }, [])
  return (
    <>
      <RouterView />
    </>
  )
}

export default App
