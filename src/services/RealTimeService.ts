import { useContext, useEffect } from 'react';
import { WebSocketContext } from '@/provider/WebSocketProvider';
import { TransactionInputType } from '@/types/TransactionType';
import { ConstructorParamsType } from './types/Service';

class RealTimeService {
  #ws;
  #cookie;
  #dispatch;

  constructor({ ws, cookie, dispatch }: ConstructorParamsType) {
    this.#ws = ws;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
  }

  coinPrice() {
    const input: TransactionInputType = {
      Header: {
        function: 'A',
        termtype: 'HTS',
        trcode: '91',
      },
      Input1: {
        Key1: 'BTCUSDT',
        Key2: 'ETHUSDT',
        Key3: 'XRPUSDT',
        Key4: 'DOGEUSDT',
      },
    };

    const disConnectInput: TransactionInputType = {
      ...input,
      Header: { ...input.Header, function: 'U' },
    };

    useEffect(() => {
      this.#ws.sendInput(disConnectInput);
      setTimeout(() => {
        this.#ws.sendInput(input);
      }, 5);

      return () => {
        this.#ws.sendInput(disConnectInput);
      };
    }, []);
  }
}

export default RealTimeService;
