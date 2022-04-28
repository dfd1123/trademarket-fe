import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonTransactionOutputType } from "@/types/TransactionType";
import coinList from "@/data/coinList";

const initialState : any = {};

const asyncData = createSlice({
    name: 'asyncData',
    initialState,
    reducers: {
        updateAsyncData(state, action: PayloadAction<CommonTransactionOutputType>){
            let coinSymbol : string | number = '';
            if(action.payload.Header.trid){
                coinSymbol = coinList[Number(action.payload.Header.trid)];
                if(coinSymbol === 0) coinSymbol = '';
                else coinSymbol = `_${coinSymbol}`;
            } else if (action.payload.Header.trcode === 't9732'){
                coinSymbol = action.payload.Output1.szCurNo.trim();
                if(coinSymbol === 0) coinSymbol = '';
                else coinSymbol = `_${coinSymbol}`;
            }

            const trcode : string = action.payload.Header.trcode.trim() + coinSymbol;
            state[trcode] = action.payload;
        },
        resetSpecificState(state, action: PayloadAction<{trcode: string, trid?: string, symbol?: string}>){
            let coinSymbol : string | number = '';
            if(action.payload.trid){
                coinSymbol = coinList[Number(action.payload.trid)];
                if(coinSymbol === 0) coinSymbol = '';
                else coinSymbol = `_${coinSymbol}`;
            } else if (action.payload.symbol) {
                coinSymbol = `_${action.payload.symbol}`;
            }
            
            const trcode : string = action.payload.trcode + coinSymbol;
            if(state[trcode]) state[trcode] = undefined;
        },
        resetAllState(state, action){
            state = {};
        }
    }
});

export const { updateAsyncData, resetSpecificState, resetAllState } = asyncData.actions;

export default asyncData.reducer;
