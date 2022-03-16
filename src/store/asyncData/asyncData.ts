import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonTransactionOutputType } from "@/types/TransactionType";
import tridList from "@/data/tridList";

const initialState : any = {};

const asyncData = createSlice({
    name: 'asyncData',
    initialState,
    reducers: {
        updateAsyncData(state, action: PayloadAction<CommonTransactionOutputType>){
            let coinSymbol : string | number = '';
            if(action.payload.Header.trid){
                coinSymbol = tridList[Number(action.payload.Header.trid)];
                if(coinSymbol === 0) coinSymbol = '';
                else coinSymbol = `_${coinSymbol}`;
            }
            const trcode : string = action.payload.Header.trcode.trim() + coinSymbol;
            state[trcode] = action.payload;
        },
        resetSpecificState(state, action: PayloadAction<{trcode: string, trid?: string}>){
            let coinSymbol : string | number = '';
            if(action.payload.trid){
                coinSymbol = tridList[Number(action.payload.trid)];
                if(coinSymbol === 0) coinSymbol = '';
                else coinSymbol = `_${coinSymbol}`;
            }
            
            const trcode : string = action.payload.trcode + coinSymbol;
            state[trcode] = undefined;
        },
        resetAllState(state, action){
            state = {};
        }
    }
});

export const { updateAsyncData, resetSpecificState, resetAllState } = asyncData.actions;

export default asyncData.reducer;
