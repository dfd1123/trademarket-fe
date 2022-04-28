export interface OrderBookData {
  price: number | string;
  rem: number;
  acc?: number;
  amountPerc?: number | string;
  totalPerc?: number | string;
}

export interface TradeHistoryData {
  time: number | Date | string;
  low: number;
  high: number;
  open: number;
  close: number;
  volume: number;
  type: 'S' | 'B';
}

export interface SimpleTradeHistoryData {
  datetime: string;
  close: string | number;
  amount: string | number;
  type: 'S' | 'B';
}

export interface PointPositionRowData {
  symbol: string;
  lot: number;
  side: string;
  price: number | string;
  currentPrice: number | string;
  priceDiffrence: number | string;
  grossPnL: number | string;
  commision: number | string;
  netPl: number | string;
  pointPosition: number;
}

export interface OpenOrderRowData {
  orderNo: string;
  symbol: string;
  side: string;
  price: number | string;
  lot: number;
  currentPrice: number | string;
  stop: number;
  limit: number;
  crossIso: string;
  orderTime: string;
  leverage: string;
}

export interface MyTradeHistoryRowData {
  orderNo: string;
  excuteNo: string;
  symbol: string;
  orderLot: number;
  excuteLot: number;
  orderKinds: number | string;
  orderPrice: number | string;
  excutePrice: number | string;
  orderType: string;
  orderTime: string;
  excuteTime: string;
  pointPosition: number;
}

export interface MyDetailTradeHistoryRowData {
  orderNo: string;
  excuteNo: string;
  symbol: string;
  side: string;
  lot: number;
  orderPrice: string;
  stopPrice: string;
  limitPrice: string;
  orderKinds: string;
  orderType: string;
  stat: string;
  orderTime: string;
  managerId: string;
  ipAddress: string;
}

export interface OpenPositionRowData {
  ticketNo: string;
  symbol: string;
  side: string;
  price: number | string;
  lot: number;
  currentPrice: number | string;
  stop: number | string;
  limit: number | string;
  priceDiffrence: number | string;
  grossPnl: number | string;
  leverage: number;
  crossIso: string;
  market: string;
  orderTime: string;
  orderNo: string;
  stopNo: string;
  limitNo: string;
  businessDate: string | number;
}
