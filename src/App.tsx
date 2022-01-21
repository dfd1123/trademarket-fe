import {useEffect, useState} from 'react';
import logo from './logo.svg'
import './App.css'
import RouterView from '@/router';
import socketService from '@/modules/SocketService';

function App() {
  useEffect(() => {
    socketService.init();

    const input = {
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
      // @ts-ignore
      socketService.liveSend(input)
    }, 2000)
  }, [])
  return (
    <>
      <RouterView />
    </>
  )
}

export default App
