import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const coinInfoKeys = [
    'CUR_NO',
    'NAME_ENG',
    'NAME_KOR',
    'EX_CODE',
    'TERM_YY',
    'TERM_NO1',
    'TERM_QMW',
    'FX_CODE',
    'TRADE_TYPE',
    'CLOSE_DATE',
    'DAY_COUNT',
    'ST_DATE',
    'ED_DATE',
    'ST_TIME',
    'ED_TIME',
    'CLOSE_TIME',
    'MAX_ORDCNT',
    'MIN_ORDCNT',
    'PIP_LOWEST',
    'PIP_COST',
    'ORDER_STAT',
    'MAX_LEVERAGE',
    'szCurNo',
    'szDate',
    'szTime',
    'fOpen',
    'fHigh',
    'fLow',
    'fClose',
    'fVolume',
    'fPreClose',
    'fBuyPrice',
    'fSellPrice',
];

const initialState : CoinInfoState = {
    symbols: {},
    symbolCount: 0
};

const coinInfoSlice = createSlice({
    name: 'coinInfoSlice',
    initialState,
    reducers: {
        updateCoinInfo(state, action: PayloadAction<{ Output1?: { szCnt: string }, Output2?: any[]}>){
            const {Output1, Output2} = action.payload;
            
            const symbols : any = {};
            const coinArr = Output2 ? Output2 : [];

            for(let i = 0; i < coinArr.length; i++){
                const curNo = (coinArr[i][0] ?? '').trim();
                if(curNo){
                    const coinInfo : any = {};
                    for(let j = 0; j < coinArr[i].length; j++){
                        const key : string = coinInfoKeys[j];
                        let value = coinArr[i][j];
                        if(typeof value === 'string') value = value.trim();
                        coinInfo[key] = value;
                    }
                    symbols[curNo] = coinInfo;
                }
            }
            state.symbols = symbols as CoinInfo;
            state.symbolCount = Number(Output1?.szCnt ?? 0);
        }
    }
});

export const { updateCoinInfo } = coinInfoSlice.actions;

export default coinInfoSlice.reducer;
