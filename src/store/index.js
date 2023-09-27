import { configureStore } from '@reduxjs/toolkit';
import { GlobalReducer } from '../features'
import * as Dispatches from './dispatch'
export const store = configureStore({
  reducer: {
    global: GlobalReducer,
  }
});

export const dispatch = Dispatches;

export default store;