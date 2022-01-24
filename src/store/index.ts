import { combineReducers } from 'redux';
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import realTimePrice from '@/store/realTime/realTimePrice';

export type RootState = ReturnType<typeof store.getState>;
export type Selector<T> = (state: RootState) => T;

const rootReducer = combineReducers({
  realTimePrice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
