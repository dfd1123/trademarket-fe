import { useContext, useEffect } from 'react';
import { ConstructorParamsType } from './types/Service';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';

class CoinInfoService {
  #ws;
  #cookie;
  #dispatch;

  constructor({ ws, cookie, dispatch }: ConstructorParamsType) {
    this.#ws = ws;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
  }

  reqAllCoinInfo() {
    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't5511',
      },
      Input1: { szMemberNo: process.env.SZ_MEMBER_NO },
    };

    this.#ws.sendInput(input);
  }
}

export default CoinInfoService;
