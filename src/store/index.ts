import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalSlice from '@/store/modal/modal';
import dialogSlice from '@/store/modal/dialog';
import toastSlice from '@/store/modal/toast';
import infoReducer from '@/store/info/infoReducer';
import authSlice from '@/store/auth/auth';
import asyncData from '@/store/asyncData/asyncData';
import realTimeData from '@/store/realTime/realTimeData';
import coinInfoSlice from '@/store/coinInfo/coinInfoSlice';

export type RootState = ReturnType<typeof store.getState>;
export type Selector<T> = (state: RootState) => T;

const reducers = combineReducers({
  modalSlice,
  dialogSlice,
  toastSlice,
  infoReducer,
  authSlice,
  asyncData,
  realTimeData,
  coinInfoSlice
});

const persistConfig = { 
  key: 'elpist', 
  storage, 
  whitelist:['authSlice']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
