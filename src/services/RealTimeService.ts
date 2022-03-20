import { useEffect } from 'react';
import { TransactionInputType } from '@/types/TransactionType';
import { ConstructorParamsType } from './types/Service';
import useCoinList from '@/hooks/useCoinList';

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
    const {symbols} = useCoinList();

    const input: TransactionInputType = {
      Header: {
        function: 'A',
        termtype: 'HTS',
        trcode: '91',
      },
      Input1: {
      },
    };

    for(let i = 0; i < symbols.length; i++){
      input.Input1[`Key${i + 1}`] = symbols[i];
    }

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
    }, [symbols]);

    useEffect(() => {
      return () => {
        this.#ws.sendInput(disConnectInput);
      };
    }, []);
  }
}

export default RealTimeService;
