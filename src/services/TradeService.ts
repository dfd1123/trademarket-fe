import { useContext, useEffect, useState } from 'react';
import { ConstructorParamsType } from './types/Service';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';
import tridList from '@/data/tridList';
import { OrderOutput } from '@/store/realTime/types/realTimeData';
import { formatNumber, unformatNumber } from '@/utils/numberUtils';
import {
  MyTradeHistoryRowData,
  OpenOrderRowData,
  OpenPositionRowData,
  OrderBookData,
  PointPositionRowData,
  TradeHistoryData,
} from './types/Trade';
import useUserData from '@/hooks/useUserData';
import { translateOrderType, translateSzPoCode } from '@/utils/translateUtils';
import { resetSpecificState } from '@/store/asyncData/asyncData';
import { dateFormat } from '@/utils/dateUtils';
import { DealType } from '@/provider/TradeInfoProvider';

class TradeHistory {
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

  getOrderBookData(symbol: string = 'BTCUSDT', decimal: number = 2) {
    const orderBookData = useTypedSelector((state) => state.asyncData[`t9733`]);

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't9733',
      },
      Input1: {
        szCurNo: symbol,
      },
    };

    const { fetchData } = useAsyncData(input);

    fetchData(); // 즉시 함수 호출

    const orderBookObj: OrderOutput = orderBookData?.Output1 || {};
    const { buyOrder, sellOrder } = this.orderBookDataSetting(
      orderBookObj,
      decimal
    );

    return { buyOrder: buyOrder ?? [], sellOrder: sellOrder ?? [] };
  }

  getTradeHistory(
    symbol: string,
    nMinTerm: string | number = 1,
    cTermDiv: string | number,
    nReqCnt: string | number = 500
  ) {
    const tradeHistory = useTypedSelector(
      (state) => state.asyncData[`t9731_${symbol}`]
    );
    nReqCnt = nReqCnt.toString();
    nMinTerm = nMinTerm.toString();
    cTermDiv = cTermDiv.toString();

    const tridIndex = tridList.findIndex((preSymbol) => preSymbol === symbol);

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't9731',
        trid: String(tridIndex === -1 ? 1 : tridIndex),
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

    const { fetchData } = useAsyncData(input);

    const tradeHistoryFetchData = (
      nMinTerm: string | number,
      cTermDiv: string | number,
      nReqCnt: string | number = 500
    ) => {
      input.Input1.nReqCnt = nReqCnt.toString();
      input.Input1.nMinTerm = nMinTerm.toString();
      input.Input1.cTermDiv = cTermDiv.toString();

      fetchData({ ...input });
    };

    useEffect(() => {
      // fetchData({ ...input });

      return () => {
        this.#dispatch(resetSpecificState({ trcode: `t9731_${symbol}` }));
      };
    }, []);

    const tradeHistoryArr: TradeHistoryData[] = (
      tradeHistory?.Output1 || []
    ).map((history) => ({
      time: Number(history[0]),
      low: history[3],
      high: history[2],
      open: history[1],
      close: history[4],
      volume: history[5],
    }));

    return { tradeHistoryArr, tradeHistoryFetchData };
  }

  reqNewOrder(symbol: string) {
    const { email, szAccNo, szPasswd } = useUserData();
    const newOrderData = useTypedSelector((state) => state.asyncData[`t3216`]);

    const [msgFlag, setMsgFlag] = useState(false);

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        token: '',
        trcode: 't3216',
        userid: email,
      },
      Input1: {
        cIsStaff: '0',
        cModType: '4',
        fNxOpenRate: '',
        fOrderPrice: '',
        fOrderSu: '',
        leverage: '',
        margin_type: '',
        szAccNo,
        szCurNo: symbol,
        szDealDiv: '', // 079, 081
        szOrdType: '',
        szPasswd: szPasswd,
        szStaffID: '',
        szStaffPW: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const sendOrder = ({
      price,
      amount,
      leverage,
      marginType,
      orderType,
      deal,
    }) => {
      input.Input1.fOrderPrice = price.toString();
      input.Input1.fOrderSu = amount.toString();
      input.Input1.leverage = leverage.toString();
      input.Input1.margin_type = marginType.toString();
      input.Input1.szOrdType = orderType.toString();
      input.Input1.szDealDiv = deal;

      console.log(price, amount);

      if (!price || price <= 0) return this.#toast('Please Check Price!');
      else if (!amount || amount <= 0)
        return this.#toast('Please Check Amount!');

      if (input.Header.userid) fetchData({ ...input });
    };

    const sellNewOrder = ({ price, amount, leverage, marginType, orderType }) =>
      sendOrder({
        price: unformatNumber(price),
        amount: unformatNumber(amount),
        leverage,
        marginType,
        orderType,
        deal: '081',
      });

    const buyNewOrder = ({ price, amount, leverage, marginType, orderType }) =>
      sendOrder({
        price: unformatNumber(price),
        amount: unformatNumber(amount),
        leverage,
        marginType,
        orderType,
        deal: '079',
      });

    useEffect(() => {
      if (!msgFlag && newOrderData && newOrderData.Message) {
        console.log('GGlqkv', msgFlag);
        setMsgFlag(true);
        if (newOrderData.Message.flag === '0') {
          if (newOrderData.Message.data)
            this.#toast(newOrderData.Message.data, { type: 'success' });
          this.#dispatch(resetSpecificState({ trcode: 't3216' }));
        } else {
          if (newOrderData.Message.data) this.#toast(newOrderData.Message.data);
          this.#dispatch(resetSpecificState({ trcode: 't3216' }));
        }
      }

      setMsgFlag(false);
    }, [newOrderData]);

    return { newOrderData, sellNewOrder, buyNewOrder };
  }

  reqModifyOrder() {
    const { email, szAccNo, szPasswd } = useUserData();
    const modifyOrderData = useTypedSelector(
      (state) => state.asyncData[`t3216`]
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        token: '',
        trcode: 't3216',
        userid: email,
      },
      Input1: {
        cIsStaff: '0',
        cModType: '7',
        fNxOpenRate: '',
        fOrderPrice: '',
        fOrderSu: '',
        szAccNo,
        szCurNo: '',
        szDealDiv: '', // Buy, Sell
        szOrdType: '',
        szPasswd: szPasswd,
        szSLCustItem: '',
        szStaffID: '',
        szStaffPW: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const sendModifyOrder = ({
      symbol,
      price,
      amount,
      orderId,
      orderType,
      deal,
    }: {
      symbol: string;
      price: number;
      amount: number;
      orderId: string;
      orderType: string;
      deal: DealType | string;
    }) => {
      input.Input1.szCurNo = symbol;
      input.Input1.fOrderPrice = unformatNumber(price.toString());
      input.Input1.fOrderSu = unformatNumber(amount.toString());
      input.Input1.fOrderL;
      input.Input1.szOrdType = orderType.toString();
      input.Input1.szSLCustItem = orderId;
      input.Input1.szDealDiv = translateSzPoCode(deal, false);

      if (!price || price <= 0) return this.#toast('Please Check Price!');
      else if (!amount || amount <= 0)
        return this.#toast('Please Check Amount!');

      if (input.Header.userid) fetchData({ ...input });
    };

    useEffect(() => {
      if (modifyOrderData && modifyOrderData.Message) {
        if (modifyOrderData.Message.flag === '0') {
          if (modifyOrderData.Message.data)
            this.#toast(modifyOrderData.Message.data, { type: 'success' });
          this.#dispatch(resetSpecificState({ trcode: 't3216' }));
        } else {
          if (modifyOrderData.Message.data)
            this.#toast(modifyOrderData.Message.data);
          this.#dispatch(resetSpecificState({ trcode: 't3216' }));
        }
      }
    }, [modifyOrderData]);

    return { modifyOrderData, sendModifyOrder };
  }

  reqCancelOrder() {
    const { email, szAccNo, szPasswd } = useUserData();
    const cancelOrderData = useTypedSelector(
      (state) => state.asyncData[`t3215`]
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        token: '',
        trcode: 't3215',
        userid: email,
      },
      Input1: {
        cIsStaff: '0',
        cModType: '8',
        fNxOpenRate: '',
        fOrderPrice: '',
        fOrderSu: '',
        szAccNo,
        szCurNo: '',
        szDealDiv: '', // Buy, Sell
        szOrdType: '',
        szPasswd: szPasswd,
        szSLCustItem: '',
        szStaffID: '',
        szStaffPW: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const sendCancelOrder = ({
      symbol,
      price,
      amount,
      orderId,
      orderType,
      deal,
    }: {
      symbol: string;
      price: number;
      amount: number;
      orderId: string;
      orderType: string;
      deal: DealType | string;
    }) => {
      input.Input1.szCurNo = symbol;
      input.Input1.fOrderPrice = unformatNumber(price.toString());
      input.Input1.fOrderSu = unformatNumber(amount.toString());
      input.Input1.szOrdType = orderType.toString();
      input.Input1.szSLCustItem = orderId;
      input.Input1.szDealDiv = translateSzPoCode(deal, false);

      if (!price || price <= 0) return this.#toast('Please Check Price!');
      else if (!amount || amount <= 0)
        return this.#toast('Please Check Amount!');

      if (input.Header.userid) fetchData({ ...input });
    };

    useEffect(() => {
      if (cancelOrderData && cancelOrderData.Message) {
        if (cancelOrderData.Message.flag === '0') {
          if (cancelOrderData.Message.data)
            this.#toast(cancelOrderData.Message.data, { type: 'success' });
          this.#dispatch(resetSpecificState({ trcode: 't3215' }));
        } else {
          if (cancelOrderData.Message.data)
            this.#toast(cancelOrderData.Message.data);
          this.#dispatch(resetSpecificState({ trcode: 't3215' }));
        }
      }
    }, [cancelOrderData]);

    return { cancelOrderData, sendCancelOrder };
  }

  reqSetLimitStop() {
    const { email, szAccNo, szPasswd } = useUserData();
    const setStopLimitData = useTypedSelector(
      (state) => state.asyncData[`t3215`]
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        token: '',
        trcode: 't3215',
        userid: email,
      },
      Input1: {
        cIsStaff: '0',
        cModType: '4',
        fNxOpenRate: '',
        fOrderPrice: '',
        fOrderSu: '',
        szAccNo,
        szCurNo: '',
        szDealDiv: '',
        szOrdType: '',
        szPasswd: szPasswd,
        szSLCustItem: '',
        szStaffID: '',
        szStaffPW: '',
      },
    };

    const { fetchData } = useAsyncData(input);

    const sendSetStopLimit = ({
      symbol,
      price,
      amount,
      orderId,
      orderType,
      modType = '4',
      stopNo,
      limitNo,
      deal,
    }: {
      symbol: string;
      price: number;
      amount: number;
      orderId: string;
      orderType: string;
      modType?: string;
      stopNo?: string;
      limitNo?: string;
      deal: DealType | string;
    }) => {
      input.Input1.szCurNo = symbol;
      input.Input1.fOrderPrice = unformatNumber(price.toString());
      input.Input1.fOrderSu = unformatNumber(amount.toString());
      input.Input1.szOrdType = orderType.toString();
      input.Input1.cModType = modType;
      input.Input1.szOrgCustItem = orderId;
      input.Input1.szDealDiv = deal === '079' ? '082' : deal === '081' ? '080' : null;

      if(modType === '0'){
        if(stopNo) input.Input1.szSLCustItem = stopNo;
        else if(limitNo) input.Input1.szSLCustItem = limitNo;
      }

      const stopPrice = unformatNumber((input.Input1.fStopPrice ?? '0').toString());
      const limitPrice = unformatNumber((input.Input1.fLimitPrice ?? '0').toString());

      if(input.Input1.szDealDiv === '079'){
        if(orderType === 'UCES' && stopPrice >= price){
          return this.#toast('Please Check STOP Price!');
        }

        if(orderType === 'UCEL' && limitPrice <= price){
          return this.#toast('Please Check LIMIT Price!');
        }
      }

      if(input.Input1.szDealDiv === '081'){
        if(orderType === 'UCES' && stopPrice <= price){
          return this.#toast('Please Check STOP Price!');
        }

        if(orderType === 'UCEL' && limitPrice >= price){
          return this.#toast('Please Check LIMIT Price!');
        }
      }

      if (!price || price <= 0) return this.#toast('Please Check Price!');
      else if (!amount || amount <= 0)
        return this.#toast('Please Check Amount!');

      if (input.Header.userid) fetchData({ ...input });
    };

    const sendSetStop = ({
      symbol,
      price,
      stopPrice,
      amount,
      orderId,
      orderType,
      modType = '4',
      stopNo,
      deal,
    }: {
      symbol: string;
      price: number;
      stopPrice: number;
      amount: number;
      orderId: string;
      orderType: string;
      modType?: string;
      stopNo?: string;
      deal: DealType | string;
    }) => {
      input.Input1.fStopPrice = unformatNumber(stopPrice.toString());
      sendSetStopLimit({ symbol, price, amount, orderId, orderType, modType, stopNo, deal });
    };

    const sendSetLimit = ({
      symbol,
      price,
      limitPrice,
      amount,
      orderId,
      orderType,
      modType = '4',
      limitNo,
      deal,
    }: {
      symbol: string;
      price: number;
      limitPrice: number;
      amount: number;
      orderId: string;
      orderType: string;
      modType?:string;
      limitNo?: string;
      deal: DealType | string;
    }) => {
      input.Input1.fLimitPrice = unformatNumber(limitPrice.toString());
      sendSetStopLimit({ symbol, price, amount, orderId, orderType, modType, limitNo, deal });
    };

    const sendSetMarket = ({
      symbol,
      price,
      amount,
      orderId,
      orderType,
      modType = '4',
      deal,
    }: {
      symbol: string;
      price: number;
      amount: number;
      orderId: string;
      orderType: string;
      modType?: string;
      deal: DealType | string;
    }) => {
      sendSetStopLimit({ symbol, price, amount, orderId, orderType, modType, deal });
    };

    useEffect(() => {
      if (setStopLimitData && setStopLimitData.Message) {
        if (setStopLimitData.Message.flag === '0') {
          if (setStopLimitData.Message.data)
            this.#toast(setStopLimitData.Message.data, { type: 'success' });
          this.#dispatch(resetSpecificState({ trcode: 't3215' }));
        } else {
          if (setStopLimitData.Message.data) this.#toast(setStopLimitData.Message.data);
          this.#dispatch(resetSpecificState({ trcode: 't3215' }));
        }
      }
    }, [setStopLimitData]);

    return { setStopLimitData, sendSetStop, sendSetLimit, sendSetMarket };
  }

  orderBookDataSetting(
    orderBookObj: OrderOutput | undefined,
    decimal: number = 2,
    live = false
  ) {
    const prefix = live ? 'sz' : 'f';
    let buyOrder: OrderBookData[] = [];
    let sellOrder: OrderBookData[] = [];

    if (!orderBookObj) {
      return { buyOrder, sellOrder };
    }

    for (let i = 1; i <= 10; i++) {
      if (orderBookObj[`${prefix}BuyPrc${i}`]) {
        const price = Number(orderBookObj[`${prefix}BuyPrc${i}`] ?? 0);
        const rem = Number(orderBookObj[`${prefix}BuyRem${i}`] ?? 0);
        buyOrder.push({
          price,
          rem,
          acc: buyOrder.length
            ? (buyOrder[buyOrder.length - 1]?.acc ?? 0) + rem
            : rem,
        });
      }
    }

    // -----------

    for (let i = 1; i <= 10; i++) {
      if (orderBookObj[`${prefix}SellPrc${i}`]) {
        const price = Number(orderBookObj[`${prefix}SellPrc${i}`] ?? 0);
        const rem = Number(orderBookObj[`${prefix}SellRem${i}`] ?? 0);
        sellOrder.unshift({
          price,
          rem,
          acc: (sellOrder[0]?.acc ?? 0) + rem,
        });
      }
    }

    const buyTotalAmount = buyOrder.reduce((prev, cur) => prev + cur.rem, 0);
    const sellTotalAmount = sellOrder.reduce((prev, cur) => prev + cur.rem, 0);

    // console.log(buyTotalAmount);

    buyOrder = buyOrder
      .filter((order) => order.price !== 0)
      .map((order) => ({
        ...order,
        price: formatNumber(order.price, decimal),
        amountPerc: formatNumber(Number(order.rem / buyTotalAmount), decimal),
        totalPerc: formatNumber(
          Number((order.acc as number) / buyTotalAmount),
          decimal
        ),
      }));
    sellOrder = sellOrder
      .filter((order) => order.price !== 0)
      .map((order) => ({
        ...order,
        price: formatNumber(order.price, decimal),
        amountPerc: formatNumber(Number(order.rem / sellTotalAmount), decimal),
        totalPerc: formatNumber(
          Number((order.acc as number) / sellTotalAmount),
          decimal
        ),
      }));

    return { buyOrder, sellOrder };
  }

  getPositionDetail() {
    const { email, szAccNo } = useUserData();
    const positionDetailOutput = useTypedSelector(
      (state) => state.asyncData[`t3720`]
    );
    const myConclusion = useTypedSelector(
      (state) => state.realTimeData.myConclusion
    );
    const myNewOrder = useTypedSelector(
      (state) => state.realTimeData.myNewOrder
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3720',
        userid: email,
        token: '',
      },
      Input1: {
        szAccNo: szAccNo,
      },
    };

    const { fetchData: getPositionDetail } = useAsyncData(input);

    const parseData = (output): PointPositionRowData[] => {
      const outputData = output?.Output2 || [];

      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === 'string' ? data.toString().trim() : data
        );

        const pointPosition = newD[18];

        const result: PointPositionRowData = {
          symbol: newD[1],
          lot: newD[2],
          side: translateSzPoCode(newD[3], false),
          price: newD[4],
          currentPrice: newD[5],
          priceDiffrence: newD[6],
          grossPnL: newD[9],
          commision: newD[12],
          netPl: newD[14],
          pointPosition,
        };

        return result;
      });
    };

    useEffect(() => {
      getPositionDetail({ ...input });
    }, [myConclusion, myNewOrder]);

    return {
      loading: !Boolean(positionDetailOutput),
      noData:
        Boolean(positionDetailOutput) &&
        Number(positionDetailOutput.Output1?.szCnt ?? 0) === 0,
      positionDetail: parseData(positionDetailOutput),
      getPositionDetail,
    };
  }

  getOpenOrders() {
    const { szAccNo } = useUserData();
    const openOrdersOutput = useTypedSelector(
      (state) => state.asyncData[`t3600`]
    );
    const myConclusion = useTypedSelector(
      (state) => state.realTimeData.myConclusion
    );
    const myNewOrder = useTypedSelector(
      (state) => state.realTimeData.myNewOrder
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3600',
      },
      Input1: {
        szAccNo: szAccNo,
      },
    };

    const { fetchData: getOpenOrders } = useAsyncData(input);

    const parseData = (output): OpenOrderRowData[] => {
      const outputData = output?.Output2 || [];

      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === 'string' ? data.toString().trim() : data
        );

        const result: OpenOrderRowData = {
          orderNo: newD[0],
          symbol: newD[1],
          side: translateSzPoCode(newD[2], false),
          price: newD[3],
          lot: newD[4],
          currentPrice: newD[5],
          stop: newD[6],
          limit: newD[7],
          crossIso: newD[8],
          orderTime: newD[9],
          leverage: newD[10],
        };

        return result;
      });
    };

    useEffect(() => {
      getOpenOrders({ ...input });
    }, [myNewOrder, myConclusion]);

    return {
      loading: !Boolean(openOrdersOutput),
      noData:
        Boolean(openOrdersOutput) &&
        Number(openOrdersOutput.Output1?.szCnt ?? 0) === 0,
      openOrders: parseData(openOrdersOutput),
      getOpenOrders,
    };
  }

  getMyTradeHistory() {
    const { szAccNo, email } = useUserData();
    const tradeHistoryOutput = useTypedSelector(
      (state) => state.asyncData[`t3612`]
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3612',
        userid: email,
        token: '',
      },
      Input1: {
        szAccNo: szAccNo,
        nFromDate: '',
        nToDate: '',
      },
    };
    const { fetchData } = useAsyncData(input);

    const getMyTradeHistory = (startDate: Date, endDate: Date) => {
      input.Input1.nFromDate = dateFormat(startDate, 'YMMdd');
      input.Input1.nToDate = dateFormat(endDate, 'YMMdd');

      fetchData({ ...input });
    };

    const parseData = (output): MyTradeHistoryRowData[] => {
      const outputData = output?.Output2 || [];
      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === 'string' ? data.toString().trim() : data
        );
        const result: MyTradeHistoryRowData = {
          orderNo: newD[0].slice(15, 21),
          excuteNo: newD[1].slice(10, 16),
          symbol: newD[2],
          orderLot: newD[3],
          excuteLot: newD[4],
          orderKinds: translateSzPoCode(newD[5], false),
          orderPrice: newD[6],
          excutePrice: newD[7],
          orderType: translateOrderType(newD[8], false),
          orderTime: newD[9],
          excuteTime: newD[10],
          pointPosition: newD[11],
        };
        return result;
      });
    };

    return {
      loading: !Boolean(tradeHistoryOutput),
      noData:
        Boolean(tradeHistoryOutput) &&
        Number(tradeHistoryOutput.Output1?.szCnt ?? 0) === 0,
      myTradeHistory: parseData(tradeHistoryOutput),
      getMyTradeHistory,
    };
  }

  getOpenPosition() {
    const { szAccNo, szPasswd: szAccNoPW } = useUserData();
    const openPositionOutput = useTypedSelector(
      (state) => state.asyncData[`t3602`]
    );
    const myConclusion = useTypedSelector(
      (state) => state.realTimeData.myConclusion
    );
    const myStopLimitOrder = useTypedSelector(
      (state) => state.realTimeData.myStopLimitOrder
    );

    const input: TransactionInputType = {
      Header: {
        function: 'D',
        termtype: 'HTS',
        trcode: 't3602',
      },
      Input1: {
        szAccNo,
        szAccNoPW,
        szCurNo: '',
      },
    };

    const { fetchData: getOpenPosition } = useAsyncData(input);

    const parseData = (output): OpenPositionRowData[] => {
      const outputData = output?.Output2 || [];

      return outputData.map((row) => {
        const newD = [...row].map((data) =>
          typeof data === 'string' ? data.toString().trim() : data
        );

        const result: OpenPositionRowData = {
          ticketNo: newD[0].slice(10),
          symbol: newD[1],
          side: newD[2],
          price: newD[3],
          lot: newD[4],
          currentPrice: newD[5],
          stop: newD[6],
          limit: newD[7],
          priceDiffrence: newD[8],
          grossPnl: newD[9],
          leverage: newD[10],
          crossIso: newD[11],
          market: 'Market',
          orderTime: newD[12],
          orderNo: newD[13],
          stopNo: newD[14],
          limitNo: newD[15],
          businessDate: newD[16],
        };

        return result;
      });
    };

    useEffect(() => {
      getOpenPosition({ ...input });
    }, [myStopLimitOrder, myConclusion]);

    console.log(
      openPositionOutput &&
        Number(openPositionOutput.Output1?.szCnt.trim() ?? 0)
    );

    return {
      loading: !Boolean(openPositionOutput),
      noData:
        Boolean(openPositionOutput) && !Boolean(openPositionOutput.Output2),
      openPosition: parseData(openPositionOutput),
      getOpenPosition,
    };
  }
}

export default TradeHistory;
