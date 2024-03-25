import {  createSlice } from '@reduxjs/toolkit';

import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../utils/localStorage'

const initialState = {
   user: getLocalStorage('user', null),
   mustLogin: false
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) =>{
      setLocalStorage('user', action.payload);
      console.log(action.payload, "stoage")
      state.user = action.payload;
    },
    logout: (state, action) => {
      removeLocalStorage('user');
      state.user = null;
    },
    mustLogin: (state, action) => {
      state.mustLogin = action.payload;
    }
  },
});

export const { login, logout, mustLogin } = authSlice.actions;

export const getUser = (state) => state.auth.user;

export const getMustLogin = (state) => state.auth.mustLogin;

export default authSlice.reducer;