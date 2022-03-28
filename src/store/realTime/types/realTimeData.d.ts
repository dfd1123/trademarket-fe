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

export interface RealTimeDataState {
    price:{
        [key: string]: CoinOutput | null;
    }
}

export type CoinOutputKey = keyof CoinOutput;