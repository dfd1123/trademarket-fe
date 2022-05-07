import { useContext, useEffect, useState } from "react";
import { ConstructorParamsType } from "./types/Service";
import { TransactionInputType } from "@/types/TransactionType";
import useAsyncData from "@/hooks/useAsyncData";
import { useTypedSelector } from "@/store";
import coinList from "@/data/coinList";
import { resetSpecificState } from "@/store/asyncData/asyncData";
import useUserData from "@/hooks/useUserData";
import {
  AssetData,
  CurrentCoinInfo,
  DepositHistoryData,
  WalletExchangeHistoryData,
  WalletFutureTradeHistoryData,
  WalletHistoryData,
  WalletInfo,
} from "./types/Wallet";
import { dateFormat } from "@/utils/dateUtils";
import {
  translateSzPoCode,
  translateOrderType,
  translateAccountingCode,
} from "@/utils/translateUtils";
import { unformatNumber } from "@/utils/numberUtils";

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

  getCoinCurrentInfo(symbol?: string) {
    if (symbol && !symbol.includes("USDT"))
      symbol = `${symbol.trim().toUpperCase()}USDT`.trim();

    const currentCoinInfo: CurrentCoinInfo | null = useTypedSelector(
      (state) => state.asyncData[`t9732_${symbol}`]?.Output1 ?? null
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t9732",
      },
      Input1: {
        szCurNo: symbol,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getCoinCurrentInfo = (newSymbol?: string) => {
      if (newSymbol && !newSymbol.includes("USDT")) {
        newSymbol = `${newSymbol.trim().toUpperCase()}USDT`.trim();
        input.Input1.szCurNo = newSymbol;
      }

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
      (state) => state.asyncData["t372C"]?.Output2 || [],
      (a, b) => !a.length
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t372C",
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
      (state) => state.asyncData["t3608"]?.Output2 || []
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t3608",
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

  getAvailableAmount(symbol: string) {
    const { szAccNo } = useUserData();
    const availableAmount = useTypedSelector(
      (state) => state.asyncData["t3621"]?.Output1?.avail_trf ?? 0
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t3621",
      },
      Input1: {
        accno: szAccNo,
        cur_no: symbol,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getAvailableAmount = (newSymbol: string) => {
      input.Input1.cur_no = newSymbol;

      fetchData({ ...input });
    };

    useEffect(() => {
      return () => {
        this.#dispatch(resetSpecificState({ trcode: `t3608` }));
      };
    }, []);

    return { availableAmount, getAvailableAmount };
  }

  getWalletHistory() {
    const { szAccNo } = useUserData();
    const walletHistoryData = useTypedSelector(
      (state) => state.asyncData["t3626"]
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t3626",
      },
      Input1: {
        accno: szAccNo,
        cur_no: "",
        from_dt: "",
        to_dt: "",
        po_code: "",
      },
    };

    const { fetchData } = useAsyncData(input);

    const getWalletHistory = (
      symbol: string,
      startDate: Date,
      endDate: Date
    ) => {
      input.Input1.cur_no = symbol;
      input.Input1.from_dt = dateFormat(startDate, "YMMdd");
      input.Input1.to_dt = dateFormat(endDate, "YMMdd");

      fetchData({ ...input });
    };

    const parseData = (output): WalletHistoryData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === "string" ? data.toString().trim() : data
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

  reqSpotConvert() {
    const { szAccNo } = useUserData();
    const spotConvert = useTypedSelector((state) => state.asyncData["t365J"]);

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t365J",
      },
      Input1: {
        szAccNo: szAccNo,
        szPasswd: "",
        szCurNo: "",
        fOrderSu: "",
        fExePrice: "",
        fCashOutM: "",
      },
    };

    const { fetchData } = useAsyncData(input);

    const reqSpotConvert = ({ password, symbol, coinRate, reqAmount }) => {
      reqAmount = unformatNumber(reqAmount || "0");
      coinRate = unformatNumber(coinRate || "0");

      if (reqAmount === 0) {
        alert("Please enter a quantity of 0 or more");
        return;
      } else if (!password) return;

      input.Input1.szPasswd = password;
      input.Input1.szCurNo = symbol;
      input.Input1.fOrderSu = reqAmount / (coinRate * (1 + 0.0003));
      input.Input1.fExePrice = coinRate * (1 + 0.0003);
      input.Input1.fCashOutM = reqAmount;

      fetchData({ ...input });
    };

    return { spotConvert, reqSpotConvert };
  }

  reqFutureConvert() {
    const { szAccNo } = useUserData();
    const futureConvert = useTypedSelector((state) => state.asyncData["t365K"]);

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t365K",
      },
      Input1: {
        szAccNo: szAccNo,
        szPasswd: "",
        szCurNo: "",
        fOrderSu: "",
        fExePrice: "",
        fMoney: "",
      },
    };

    const { fetchData } = useAsyncData(input);

    const reqFutureConvert = ({ password, symbol, coinRate, reqAmount }) => {
      reqAmount = unformatNumber(reqAmount || "0");
      coinRate = unformatNumber(coinRate || "0");

      if (reqAmount === 0) {
        alert("Please enter a quantity of 0 or more");
        return;
      } else if (!password) return;

      input.Input1.szPasswd = password;
      input.Input1.szCurNo = symbol;
      input.Input1.fOrderSu = reqAmount;
      input.Input1.fExePrice = coinRate * (1 - 0.0003);
      input.Input1.fMoney = reqAmount * (coinRate * (1 - 0.0003));

      fetchData({ ...input });
    };

    return { futureConvert, reqFutureConvert };
  }

  getExchangeHistory() {
    const { szAccNo } = useUserData();
    const exchangeHistoryData = useTypedSelector(
      (state) => state.asyncData["t3615"]
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t3615",
      },
      Input1: {
        accno: szAccNo,
        cur_no: "",
        from_dt: "",
        to_dt: "",
        po_code: "",
      },
    };

    const { fetchData } = useAsyncData(input);

    const getExchangeHistory = (
      symbol: string,
      startDate: Date,
      endDate: Date
    ) => {
      input.Input1.cur_no = symbol;
      input.Input1.from_dt = dateFormat(startDate, "YMMdd");
      input.Input1.to_dt = dateFormat(endDate, "YMMdd");

      fetchData({ ...input });
    };

    const parseData = (output): WalletExchangeHistoryData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row, index) => {
        const newD = [...row].map((data) =>
          typeof data === "string" ? data.toString().trim() : data
        );
        const result: WalletExchangeHistoryData = {
          id: index,
          currency: newD[1],
          code: translateSzPoCode(newD[2], true),
          rate: newD[5],
          cryptoAmt: newD[4],
          datetime: newD[6],
        };
        return result;
      });
    };

    return {
      loading: !Boolean(exchangeHistoryData),
      noData:
        Boolean(exchangeHistoryData) &&
        Number(exchangeHistoryData.Output1?.szCnt ?? 0) === 0,
      exchangeHistory: parseData(exchangeHistoryData),
      getExchangeHistory,
    };
  }

  getCoinWalletInfo(symbol: string) {
    let tempSymbol = "";
    if (symbol && !symbol.includes("USDT"))
      tempSymbol = `${symbol.trim().toUpperCase()}USDT`.trim();

    const { szAccNo } = useUserData();
    const walletInfoData = useTypedSelector(
      (state) => state.asyncData[`t0231_${tempSymbol}`]
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t0231",
        trid: "1",
      },
      Input1: {
        szAccNo: szAccNo,
        szCurNo: symbol,
      },
    };

    const { fetchData } = useAsyncData(input);

    const getCoinWalletInfo = (newSymbol: string) => {
      let tempSymbol = "";
      if (symbol && !symbol.includes("USDT"))
        tempSymbol = `${symbol.trim().toUpperCase()}USDT`.trim();

      const index = coinList.findIndex((coin) => tempSymbol === coin) ?? 0;

      input.Header.trid = index.toString();
      input.Input1.szCurNo = symbol;

      fetchData({ ...input });
    };

    return {
      walletInfo: walletInfoData?.Output1 as WalletInfo,
      getCoinWalletInfo,
    };
  }

  getDepositHistory() {
    const { szAccNo } = useUserData();
    const depositHistoryData = useTypedSelector(
      (state) => state.asyncData["t3625"]
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t3625",
      },
      Input1: {
        accno: szAccNo,
        cur_no: "",
        from_dt: "",
        to_dt: "",
        treat_stat: "",
      },
    };

    const { fetchData } = useAsyncData(input);

    const getDepositHistory = (
      symbol: string,
      startDate: Date,
      endDate: Date
    ) => {
      input.Input1.cur_no = symbol;
      input.Input1.from_dt = dateFormat(startDate, "YMMdd");
      input.Input1.to_dt = dateFormat(endDate, "YMMdd");

      fetchData({ ...input });
    };

    const parseData = (output): DepositHistoryData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row, index) => {
        const newD = [...row].map((data) =>
          typeof data === "string" ? data.toString().trim() : data
        );
        const result: DepositHistoryData = {
          id: index,
          date: newD[6],
          coin: newD[1],
          amount: `${newD[4]} ${newD[1]}`,
          tx: newD[0],
          condition: translateSzPoCode(newD[2].trim(), true),
        };
        return result;
      });
    };

    return {
      loading: !Boolean(depositHistoryData),
      noData:
        Boolean(depositHistoryData) &&
        Number(depositHistoryData.Output1?.szCnt ?? 0) === 0,
      depositHistory: parseData(depositHistoryData),
      getDepositHistory,
    };
  }

  getFutureTradeHistory() {
    const { szAccNo } = useUserData();
    const futureTradeHistoryData = useTypedSelector(
      (state) => state.asyncData["t2500"]
    );

    const input: TransactionInputType = {
      Header: {
        function: "D",
        termtype: "HTS",
        trcode: "t2500",
      },
      Input1: {
        szAccNo: szAccNo,
        nFromDate: "",
        nToDate: "",
        con_key: "",
      },
    };

    const { fetchData } = useAsyncData(input);

    const getFutureTradeHistory = (startDate: Date, endDate: Date) => {
      input.Input1.nFromDate = dateFormat(startDate, "YMMdd");
      input.Input1.nToDate = dateFormat(endDate, "YMMdd");

      fetchData({ ...input });
    };

    const parseData = (output): WalletFutureTradeHistoryData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row, index) => {
        const newD = [...row].map((data) =>
          typeof data === "string" ? data.toString().trim() : data
        );
        const result: WalletFutureTradeHistoryData = {
          id: index,
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
