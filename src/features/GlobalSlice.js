import {  createSlice } from '@reduxjs/toolkit';
import { get_daily_data } from '../data/constant';


const initialState = {
   createAppointmentModal:{
    show: false,
    date: '',
    hour: ''
   },
   appointments: get_daily_data()
};


export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCreateAppointmentModal: (state, action) => {
      state.createAppointmentModal.show = action.payload.show ?? false;
      state.createAppointmentModal.date = action.payload?.date;
      state.createAppointmentModal.hour = action.payload?.hour;
    },
    setCreateAppointmentModalProps: (state, action) => {
      state.createAppointmentModal = {
        ...state.createAppointmentModal,
        ...action.payload
      }
    },
    addAppointment: (state, action) => {
      state.appointments = [
        ...state.appointments,
        action.payload
      ]
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(a => a.id !== action.payload);
    }
  },
});

export const { 
    setCreateAppointmentModal,
    setCreateAppointmentModalProps,
    addAppointment,
    removeAppointment
 } = globalSlice.actions;



export const getCreateAppointmentModal = (state) => state.global.createAppointmentModal;
export const getAppointments = (state) => state.global.appointments;

export default globalSlice.reducer;