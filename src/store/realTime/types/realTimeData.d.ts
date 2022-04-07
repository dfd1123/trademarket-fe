export interface CoinOutput {
  szBuyOrSell: 'B' | 'S';
  szBuyPrice: string;
  szClose: string;
  szDate: string;
  szHigh: string;
  szLow: string;
  szOpen: string;
  szPreClose: string;
  szSellPrice: string;
  szSymbol: string;
  szTime: string;
  szVolume: string;
}

export interface RealTimeCoinOutput {
  fBuyOrSell: 'B' | 'S';
  fPreClose: string | number;
  fBuyPrice: string;
  fClose: string;
  fDate: string;
  fHigh: string;
  fLow: string;
  fOpen: string;
  fPreClose: string;
  fSellPrice: string;
  fSymbol: string;
  fTime: string;
  fVolume: string;
  CUR_NO: string;
  MAX_ORDCNT: string | number;
  isFavorite: boolean;
}

export interface OrderOutput {
    szBuyCnt1: string;
    szBuyCnt2: string;
    szBuyCnt3: string;
    szBuyCnt4: string;
    szBuyCnt5: string;
    szBuyCnt6: string;
    szBuyCnt7: string;
    szBuyCnt8: string;
    szBuyCnt9: string;
    szBuyCnt10: string;
    szBuyPrc1: string;
    szBuyPrc2: string;
    szBuyPrc3: string;
    szBuyPrc4: string;
    szBuyPrc5: string;
    szBuyPrc6: string;
    szBuyPrc7: string;
    szBuyPrc8: string;
    szBuyPrc9: string;
    szBuyPrc10: string;
    szBuyRem1: string;
    szBuyRem2: string;
    szBuyRem3: string;
    szBuyRem4: string;
    szBuyRem5: string;
    szBuyRem6: string;
    szBuyRem7: string;
    szBuyRem8: string;
    szBuyRem9: string;
    szBuyRem10: string;
    szDate: string;
    szSellCnt1: string;
    szSellCnt2: string;
    szSellCnt3: string;
    szSellCnt4: string;
    szSellCnt5: string;
    szSellCnt6: string;
    szSellCnt7: string;
    szSellCnt8: string;
    szSellCnt9: string;
    szSellCnt10: string;
    szSellPrc1: string;
    szSellPrc2: string;
    szSellPrc3: string;
    szSellPrc4: string;
    szSellPrc5: string;
    szSellPrc6: string;
    szSellPrc7: string;
    szSellPrc8: string;
    szSellPrc9: string;
    szSellPrc10: string;
    szSellRem1: string;
    szSellRem2: string;
    szSellRem3: string;
    szSellRem4: string;
    szSellRem5: string;
    szSellRem6: string;
    szSellRem7: string;
    szSellRem8: string;
    szSellRem9: string;
    szSellRem10: string;
    szSymbol: string;
    szTime: string;
  }

export interface RealTimePriceData {
  [key: string]: CoinOutput | null;
}

export interface RealTimeOrderData {
    [key: string]: OrderOutputData | null;
}

export interface RealTimeDataState {
  realTimePrice: RealTimePriceData;
  price: RealTimePriceData;
  order: RealTimeOrderData;
}

export type CoinOutputKey = keyof CoinOutput;
