import {  createSlice } from '@reduxjs/toolkit';


const initialState = {
   createAppointmentModal:{
    show: false,
    date: '',
    hour: ''
   },
   appointments: []
};


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCreateAppointmentModal: (state, action) => {
      state.createAppointmentModal.show = action.payload.show ?? false;
      state.createAppointmentModal.date = action.payload.date;
      state.createAppointmentModal.hour = action.payload.hour;
    },
    setCreateAppointmentModalProps: (state, action) => {
      state.createAppointmentModal = {
        ...state.createAppointmentModal,
        ...action.payload
      }
    }
  },
});

export const { 
    setCreateAppointmentModal,
    setCreateAppointmentModalProps
 } = globalSlice.actions;



export const createAppointmentModal = (state) => state.global.createAppointmentModal;


export default globalSlice.reducer;