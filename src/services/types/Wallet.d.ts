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
  id: number;
  date: string;
  no: number;
  accountingCode: string;
  point: number;
  pointCurrentBal: number;
  excutionNo: string;
}

export interface WalletExchangeHistoryData {
  id: number;
  currency: string;
  code: string;
  rate: number | string;
  cryptoAmt: number | string;
  datetime: string;
}

export interface WalletInfo {
  szCoin_Amt: string;
  szDest_Tag: string;
  szRet_CD: string;
  szWallet_Addr: string;
}

export interface DepositHistoryData {
  id: number;
  date: string;
  coin: string;
  amount: string;
  tx: string;
  condition: string;
}

export interface WithdrawHistoryData {
  id: number;
  date: string;
  no: string | number;
  accountNo: string;
  datetime: string;
  walletAddress: string;
  amount: number;
  symbol: string;
  price: string | number;
  treatStat: string;
  treatTime: string;
  memo: string;
  addressTag: string;
  txid: string;
}

export interface RequestWithdrawParams {
  symbol: string;
  address: string;
  extr: string;
  amount: string | number;
  closePrice: string | number;
  password: string;
}
