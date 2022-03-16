import { createSlice, createSelector, PayloadAction, CombinedState } from '@reduxjs/toolkit';
import { RootState, Selector } from '@/store';
import { RealTimePriceState, CoinOutput, CoinOutputKey } from './types/realTimePrice';

const initialState : RealTimePriceState = {
    BTCUSDT: null,
    ETHUSDT: null,
    DOGEUSDT: null,
    XRPUSDT: null
};

const realTimePrice = createSlice({
    name: 'realTimePrice',
    initialState,
    reducers: {
        updatePriceData:{
            reducer(state, action: PayloadAction<CoinOutput>){
                const symbol = action.payload.szSymbol as keyof RealTimePriceState;
                if(state[symbol]?.szClose !== action.payload.szClose && (Number(action.payload.szTime) - Number(state[symbol]?.szTime || 0) > 500)) state[symbol] = action.payload;
            },
            prepare({Output1} : {Output1: CoinOutput}){
                Output1 = Object.keys(Output1).reduce((acc, key) => {
                    return {...acc, [key]: Output1[key as keyof CoinOutput].trim() }
                }, {} as CoinOutput);

                return {payload: Output1};
            }
        }
    }
});

export const { updatePriceData } = realTimePrice.actions;

export const getRealTimePrice = (symbol : keyof RealTimePriceState) : Selector<string> => createSelector((state: RootState) => {
    return state.realTimePrice[symbol]
}, coin => {
    return coin ? coin.szClose : '';
})

export default realTimePrice.reducer;
