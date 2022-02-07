import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import realTimePrice from '@/store/realTime/realTimePrice';
import asyncData from '@/store/asyncData/asyncData';
import modalSlice from '@/store/modal/modal';
import infoReducer from '@/store/info/infoReducer';

export type RootState = ReturnType<typeof store.getState>;
export type Selector<T> = (state: RootState) => T;

const rootReducer = combineReducers({
  realTimePrice,
  asyncData,
  modalSlice,
  infoReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
