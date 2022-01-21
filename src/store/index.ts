import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit';



const rootReducer = combineReducers({
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer
  });

  const store = configureStore({
      reducer: rootReducer,
      devTools: process.env.NODE_ENV !== 'production'
  });

  export type RootState = ReturnType<typeof store.getState>;