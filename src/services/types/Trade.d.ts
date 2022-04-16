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
