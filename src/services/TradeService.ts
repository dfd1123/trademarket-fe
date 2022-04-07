import { useContext, useEffect, useState } from 'react';
import { ConstructorParamsType } from './types/Service';
import { TransactionInputType } from '@/types/TransactionType';
import useAsyncData from '@/hooks/useAsyncData';
import { useTypedSelector } from '@/store';
import tridList from '@/data/tridList';
import { OrderOutput } from '@/store/realTime/types/realTimeData';
import { formatNumber } from '@/utils/numberUtils';
import { OrderBookData, TradeHistoryData } from './types/Trade';
import useUserData from '@/hooks/useUserData';

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
    const [reqData, setReqData] = useState(false);
    const trid = tridList.findIndex((id) => id === symbol);
    const tradeHistory = useTypedSelector(
      (state) => state.asyncData[`t9731_${symbol}`]
    );
    nReqCnt = nReqCnt.toString();
    nMinTerm = nMinTerm.toString();
    cTermDiv = cTermDiv.toString();

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

    if (!tradeHistory && !reqData) {
      fetchData();
      setReqData(true);
    }

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

    useEffect(() => {
      if (newOrderData && newOrderData.Message) {
        if (newOrderData.Message.flag === '0') {
          if (newOrderData.Message.data)
            this.#toast(newOrderData.Message.data, { type: 'success' });
        } else {
          if (newOrderData.Message.data) this.#toast(newOrderData.Message.data);
        }
      }
    }, [newOrderData]);

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

      if(!price || price < 0) return this.#toast('Please Check Price!');
      else if(!amount || amount < 0) return this.#toast('Please Check Amount!');

      if (input.Header.userid) fetchData({ ...input });
    };

    const sellNewOrder = ({ price, amount, leverage, marginType, orderType }) =>
      sendOrder({
        price,
        amount,
        leverage,
        marginType,
        orderType,
        deal: '081',
      });

    const buyNewOrder = ({ price, amount, leverage, marginType, orderType }) =>
      sendOrder({
        price,
        amount,
        leverage,
        marginType,
        orderType,
        deal: '079',
      });

    return { newOrderData, sellNewOrder, buyNewOrder };
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
        amountPerc: Number(order.rem / buyTotalAmount).toFixed(2),
        totalPerc: Number((order.acc as number) / buyTotalAmount).toFixed(2),
      }));
    sellOrder = sellOrder
      .filter((order) => order.price !== 0)
      .map((order) => ({
        ...order,
        price: formatNumber(order.price, decimal),
        amountPerc: Number(order.rem / sellTotalAmount).toFixed(2),
        totalPerc: Number((order.acc as number) / sellTotalAmount).toFixed(2),
      }));

    return { buyOrder, sellOrder };
  }
}

export default TradeHistory;
