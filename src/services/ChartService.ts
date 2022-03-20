import { useContext, useEffect, useState } from 'react';
import { ConstructorParamsType } from './types/Service';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';
import tridList from '@/data/tridList';

class ChartService {
  #ws;
  #cookie;
  #dispatch;

  constructor({ ws, cookie, dispatch }: ConstructorParamsType) {
    this.#ws = ws;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
  }

  getTradeHistory(symbol: string, nMinTerm: string | number, nReqCnt: string | number) {
    const [reqData, setReqData] = useState(false);
    const trid = tridList.findIndex((id) => id === symbol);
    const tradeHistory = useTypedSelector(
      (state) => state.asyncData[`t9731_${symbol}`]
    );
    nReqCnt = nReqCnt.toString();
    nMinTerm = nMinTerm.toString();
    const cTermDiv = ['1', '7', '30'].includes(nMinTerm) ? '3' : '2';

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't9731',
        trid: String(trid === -1 ? 1 : trid),
      },
      Input1: {
        szCurNo: symbol,
        cTermDiv: cTermDiv,
        szCritDate: '99999999',
        szCritTime: '999999999',
        nMinTerm: nMinTerm,
        nReqCnt: nReqCnt,
      },
    };

    const {fetchData} = useAsyncData(input);

    if(!tradeHistory && !reqData) {
      fetchData();
      setReqData(true);
    }
    
    return {tradeHistory : tradeHistory?.Output1 || []};
  }
}

export default ChartService;
