import { useContext, useEffect, useState } from 'react';
import { ConstructorParamsType } from './types/Service';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';
import coinList from '@/data/coinList';
import { resetSpecificState } from '@/store/asyncData/asyncData';
import useUserData from '@/hooks/useUserData';
import { AssetData } from './types/Wallet';

class WalletService {
  #ws;
  #cookie;
  #dispatch;
  #toast;

  constructor({ ws, cookie, dispatch, toast }: ConstructorParamsType) {
    this.#ws = ws;
    this.#cookie = cookie;
    this.#dispatch = dispatch;
    this.#toast = toast;
  }

  getCoinCurrentInfo() {
    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't9732',
      },
      Input1: {
        szCurNo: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const getCoinCurrentInfo = (symbol: string) => {
      if (!symbol) return;
      input.Input1.szCurNo = symbol;
      fetchData({ ...input });
    };

    useEffect(() => {
      return () => {
        coinList.forEach((coin) => {
          if (coin)
            this.#dispatch(resetSpecificState({ trcode: `t9732_${coin}` }));
        });
      };
    }, []);

    return { getCoinCurrentInfo };
  }

  getMyAsset(symbol: string) {
    const { szAccNo } = useUserData();
    const myAssetData = useTypedSelector((state) => state.asyncData['t372C']?.Output2 || []);

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't372C',
      },
      Input1: {
        szAccNo,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getMyAsset = () => {
      fetchData({ ...input });
    };

    
    useEffect(() => {
      return () => {
        this.#dispatch(resetSpecificState({ trcode: `t372C` }));
      };
    }, []);

    return { myAssetData, getMyAsset };
  }

  getUnrealProfitNLoss(){
    const { szAccNo } = useUserData();
    const unrealProfitNLoss = useTypedSelector((state) => state.asyncData['t3608']?.Output2 || []);
    
    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3608',
      },
      Input1: {
        szAccNo,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getUnrealProfitNLoss = () => {
      fetchData({ ...input });
    };

    useEffect(() => {
        return () => {
          this.#dispatch(resetSpecificState({ trcode: `t3608` }));
        };
      }, []);
  
      return { unrealProfitNLoss, getUnrealProfitNLoss };
  }
}

export default WalletService;
