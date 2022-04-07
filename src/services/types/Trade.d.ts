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
