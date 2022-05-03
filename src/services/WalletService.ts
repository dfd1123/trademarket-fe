import { useContext, useEffect, useState } from 'react';
import { ConstructorParamsType } from './types/Service';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';
import coinList from '@/data/coinList';
import { resetSpecificState } from '@/store/asyncData/asyncData';
import useUserData from '@/hooks/useUserData';
import {
  AssetData,
  CurrentCoinInfo,
  WalletFutureTradeHistoryData,
  WalletHistoryData,
} from './types/Wallet';
import { dateFormat } from '@/utils/dateUtils';
import {
  translateSzPoCode,
  translateOrderType,
  translateAccountingCode,
} from '@/utils/translateUtils';

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

  getCoinCurrentInfo(symbol: string) {
    if (!symbol.includes('USDT'))
      symbol = `${symbol.trim().toUpperCase()}USDT`.trim();

    const currentCoinInfo: CurrentCoinInfo | null = useTypedSelector(
      (state) => state.asyncData[`t9732_${symbol}`]?.Output1 ?? null
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't9732',
      },
      Input1: {
        szCurNo: symbol,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getCoinCurrentInfo = () => {
      fetchData({ ...input });
    };

    useEffect(() => {
      return () => {
        this.#dispatch(resetSpecificState({ trcode: `t9732_${symbol}` }));
      };
    }, []);

    return { coinInfo: currentCoinInfo, getCoinCurrentInfo };
  }

  getMyAsset() {
    const { szAccNo } = useUserData();
    const myAssetData = useTypedSelector(
      (state) => state.asyncData['t372C']?.Output2 || [],
      (a, b) => !a.length
    );

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

  getUnrealProfitNLoss() {
    const { szAccNo } = useUserData();
    const unrealProfitNLoss = useTypedSelector(
      (state) => state.asyncData['t3608']?.Output2 || []
    );

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

  getWalletHistory() {
    const { szAccNo } = useUserData();
    const walletHistoryData = useTypedSelector(
      (state) => state.asyncData['t3626']
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3626',
      },
      Input1: {
        accno: szAccNo,
        cur_no: '',
        from_dt: '',
        to_dt: '',
        po_code: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const getWalletHistory = (
      symbol: string,
      startDate: Date,
      endDate: Date
    ) => {
      input.Input1.cur_no = symbol;
      input.Input1.from_dt = dateFormat(startDate, 'YMMdd');
      input.Input1.to_dt = dateFormat(endDate, 'YMMdd');

      fetchData({ ...input });
    };

    const parseData = (output): WalletHistoryData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === 'string' ? data.toString().trim() : data
        );
        const result: WalletHistoryData = {
          txId: newD[0],
          symbol: newD[1],
          side: newD[2],
          orderType: translateOrderType(newD[3], true),
          amount: newD[4],
          currentPrice: newD[5],
          date: newD[6],
          status: newD[7],
        };
        return result;
      });
    };

    return {
      loading: !Boolean(walletHistoryData),
      noData:
        Boolean(walletHistoryData) &&
        Number(walletHistoryData.Output1?.szCnt ?? 0) === 0,
      walletHistory: parseData(walletHistoryData),
      getWalletHistory,
    };
  }

  getFutureTradeHistory() {
    const { szAccNo } = useUserData();
    const futureTradeHistoryData = useTypedSelector(
      (state) => state.asyncData['t2500']
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't2500',
      },
      Input1: {
        szAccNo: szAccNo,
        nFromDate: '',
        nToDate: '',
        con_key: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const getFutureTradeHistory = (startDate: Date, endDate: Date) => {
      input.Input1.nFromDate = dateFormat(startDate, 'YMMdd');
      input.Input1.nToDate = dateFormat(endDate, 'YMMdd');

      fetchData({ ...input });
    };

    const parseData = (output): WalletFutureTradeHistoryData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === 'string' ? data.toString().trim() : data
        );
        const result: WalletFutureTradeHistoryData = {
          date: dateFormat(new Date(newD[5].trim())),
          no: newD[0],
          accountingCode: translateAccountingCode(newD[2].trim()),
          point: newD[3],
          pointCurrentBal: newD[4],
          excutionNo: newD[7].trim(),
        };
        return result;
      });
    };

    return {
      loading: !Boolean(futureTradeHistoryData),
      noData:
        Boolean(futureTradeHistoryData) &&
        Number(futureTradeHistoryData.Output1?.szCnt ?? 0) === 0,
      futureTradeHistory: parseData(futureTradeHistoryData),
      getFutureTradeHistory,
    };
  }
}

export default WalletService;
