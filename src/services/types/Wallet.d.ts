export interface AssetData {
  symbol: string;
  totalAmount: number;
  assetValue: number;
}

export interface CurrentCoinInfo {
  fBuyPrice: number;
  fClose: number;
  fHigh: number;
  fLow: number;
  fOpen: number;
  fPreClose: number;
  fSellPrice: number;
  fVolume: number;
  szCurNo: string;
  szDate: string;
  szTime: string;
}

export interface WalletHistoryData {
  txId: string;
  symbol: string;
  side: string;
  orderType: string;
  amount: number;
  currentPrice: number;
  date: string;
  status: number;
}

export interface WalletFutureTradeHistoryData {
  date: string;
  no: number;
  accountingCode: string;
  point: number;
  pointCurrentBal: number;
  excutionNo: string;
}
