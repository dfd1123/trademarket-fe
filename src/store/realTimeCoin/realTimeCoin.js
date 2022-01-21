import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateTypes, CoinOutput, CoinOutputKey } from './types/realTimeCoin';

// const initialState : StateTypes = {
//     BTCUSDT: null,
//     ETHUSDT: null,
//     DOGEUSDT: null,
//     XRPUSDT: null
// };

const initialState  = {
    BTCUSDT: null,
    ETHUSDT: null,
    DOGEUSDT: null,
    XRPUSDT: null
};

const liveData = createSlice({
    name: 'realTimeCoin',
    initialState,
    reducers: {
        updateLiveData:{
            // reducer(state, action: PayloadAction<CoinOutput>){

            // },
            reducer(state, action){
                const symbol = action.payload.szSymbol;
                state[symbol] = action.payload;
            },
            prepare(coinData ){
                const keys = Object.keys(coinData);
                keys.forEach(key => coinData[key] = coinData[key].trim())
                return {payload: {...coinData, szSymbol: coinData.szSymbol.trim()}}
            }
        }
    }
});

export const { updateLiveData } = liveData.actions;

export default liveData.reducer;