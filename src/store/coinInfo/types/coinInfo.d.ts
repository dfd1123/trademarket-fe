interface CoinInfo {
    CUR_NO: string;
    NAME_ENG: string;
    NAME_KOR: string;
    EX_CODE: string;
    TERM_YY: string;
    TERM_NO1: string;
    TERM_QMW: string;
    FX_CODE: string;
    TRADE_TYPE: string;
    CLOSE_DATE: number;
    DAY_COUNT: number;
    ST_DATE: number;
    ED_DATE:number;
    ST_TIME: number;
    ED_TIME: number;
    CLOSE_TIME: number;
    MAX_ORDCNT: number;
    MIN_ORDCNT: number;
    PIP_LOWEST: number;
    PIP_COST: number;
    ORDER_STAT: string;
    MAX_LEVERAGE: string;
}

interface CoinInfoState {
    currentSymbol?: CoinInfo | {};
    symbols: {
        [key: string]: CoinInfo;
    };
    symbolCount: number;
}

