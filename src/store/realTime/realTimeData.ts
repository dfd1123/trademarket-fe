import { createSlice, createSelector, PayloadAction, CombinedState } from '@reduxjs/toolkit';
import { RootState, Selector } from '@/store';
import { RealTimeDataState, CoinOutput, CoinOutputKey, OrderOutput } from './types/realTimeData';

const initialState : RealTimeDataState = {
    realTimePrice: {
        BTCUSDT: null,
        ETHUSDT: null,
        DOGEUSDT: null,
        XRPUSDT: null
    },
    price:{
        BTCUSDT: null,
        ETHUSDT: null,
        DOGEUSDT: null,
        XRPUSDT: null
    },
    order:{
        BTCUSDT: null,
        ETHUSDT: null,
        DOGEUSDT: null,
        XRPUSDT: null
    }
};

const realTimeData = createSlice({
    name: 'realTimeData',
    initialState,
    reducers: {
        updatePriceData:{
            reducer(state, action: PayloadAction<CoinOutput>){
                const symbol = action.payload.szSymbol;
                if(state.price[symbol]?.szClose !== action.payload.szClose && (Number(action.payload.szTime) - Number(state.price[symbol]?.szTime || 0) > 500)) state.price[symbol] = action.payload;
                else state.realTimePrice[symbol] = action.payload;
            },
            prepare({Output1} : {Output1: CoinOutput}){
                Output1 = Object.keys(Output1).reduce((acc, key) => {
                    return {...acc, [key]: Output1[key as keyof CoinOutput].trim() }
                }, {} as CoinOutput);

                return {payload: Output1};
            }
        },
        updateOrderData:{
            reducer(state, action: PayloadAction<OrderOutput>){
                const symbol = action.payload.szSymbol;
                // console.log((Number(action.payload.szTime) - Number(state.order[symbol]?.szTime || 0)))
                if((Number(action.payload.szTime) - Number(state.order[symbol]?.szTime || 0) > 500)) state.order[symbol] = action.payload;
            },
            prepare({Output1} : {Output1: OrderOutput}){
                Output1 = Object.keys(Output1).reduce((acc, key) => {
                    return {...acc, [key]: Output1[key as keyof OrderOutput].trim() }
                }, {} as OrderOutput);

                return {payload: Output1};
            }
        }
    }
});

export const { updatePriceData, updateOrderData } = realTimeData.actions;

export const getRealTimePrice = (symbol : string) : Selector<string> => createSelector((state: RootState) => {
    return state.realTimeData.price[symbol]
}, coin => {
    return coin ? coin.szClose : '';
})

export default realTimeData.reducer;
