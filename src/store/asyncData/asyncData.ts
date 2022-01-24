import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonTransactionOutputType } from "@/types/TransactionType";

const initialState : any = {};

const asyncData = createSlice({
    name: 'asyncData',
    initialState,
    reducers: {
        updateAsyncData(state, action: PayloadAction<CommonTransactionOutputType>){
            const trcode : string = action.payload.Header.trcode.trim();
            state[trcode] = action.payload;
        },
        resetSpecificState(state, action: PayloadAction<{trcode: string}>){
            const trcode : string = action.payload.trcode;
            state[trcode] = undefined;
        }
    }
});

export const { updateAsyncData, resetSpecificState } = asyncData.actions;

export default asyncData.reducer;