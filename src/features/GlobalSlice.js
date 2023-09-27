import {  createSlice } from '@reduxjs/toolkit';


const initialState = {
   isVisibleCreateAppointmentModal: false,
   appointments: []
};


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setVisibleCreateAppointmentModal: (state, action) => {
      state.isVisibleCreateAppointmentModal = action.payload ?? false;
    },
  },
});

export const { 
    setVisibleCreateAppointmentModal
 } = globalSlice.actions;



export const isVisibleCreateAppointmentModal = (state) => state.global.isVisibleCreateAppointmentModal;


export default globalSlice.reducer;