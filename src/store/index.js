import { configureStore } from '@reduxjs/toolkit';
import { GlobalReducer, AuthReducer } from '../features'
import * as Dispatches from './dispatch'
export const store = configureStore({
  reducer: {
    global: GlobalReducer,
    auth: AuthReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export const dispatch = Dispatches;

export default store;