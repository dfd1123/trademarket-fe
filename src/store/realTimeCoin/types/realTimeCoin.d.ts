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

export interface StateTypes {
    BTCUSDT: CoinOutput | null;
    ETHUSDT: CoinOutput | null;
    DOGEUSDT: CoinOutput | null;
    XRPUSDT: CoinOutput | null;
}

export type CoinOutputKey = keyof CoinOutput;