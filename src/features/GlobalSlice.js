import {  createSlice } from '@reduxjs/toolkit';
import { get_daily_data } from '../data/constant';
import { ITheme } from '../identify/IScopes';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import { StorageDefine } from '../identify/ILocalStorage';


const SLICE_NAME = "global";


const theme = getLocalStorage(StorageDefine.theme, ITheme.dark, false);


const initialState = {
   theme: theme == ITheme.dark ? ITheme.dark : ITheme.light,
   createAppointmentModal:{
    show: false,
    date: '',
    hour: '',
    appointmentId: 0
   },
   editAppointmentModal: {
      open: true,
      appointmentId: 0
   },
   appointments: get_daily_data()
};


export const globalSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setTheme: (state, action) => {
      if(ITheme[action.payload]){
        state.theme = ITheme[action.payload];
        setLocalStorage(StorageDefine.theme, state.theme, false);
      }
    },
    setCreateAppointmentModal: (state, action) => {
      state.createAppointmentModal.show = action.payload.show ?? false;
      state.createAppointmentModal.date = action.payload?.date;
      state.createAppointmentModal.hour = action.payload?.hour;
      state.createAppointmentModal.appointmentId = action.payload?.appointmentId;
    },
    setCreateAppointmentModalProps: (state, action) => {
      state.createAppointmentModal = {
        ...state.createAppointmentModal,
        ...action.payload
      }
    },
    setEditAppointmentModal: (state, action) => {
      state.editAppointmentModal.open = action.payload.open;
      state.editAppointmentModal.appointmentId = action.payload.appointmentId;
    },
    addAppointment: (state, action) => {
      state.appointments = [
        ...state.appointments,
        action.payload
      ]
    },
    updateAppointment: (state, action) => {
      state.appointments = state.appointments.map(a => {
        if(a.id == action.payload.id){
          a = {
            ...a,
            ...action.payload.data
          }
        }
        return a;
      })
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(a => a.id != action.payload);
    }
  },
});

export const { 
    setTheme,
    setCreateAppointmentModal,
    setCreateAppointmentModalProps,
    setEditAppointmentModal,
    addAppointment,
    updateAppointment,
    removeAppointment
 } = globalSlice.actions;

export const getTheme = (state) => state[SLICE_NAME].theme;
export const getCreateAppointmentModal = (state) => state[SLICE_NAME].createAppointmentModal;
export const getEditAppointmentModal = (state) => state[SLICE_NAME].editAppointmentModal;
export const getAppointments = (state) => state[SLICE_NAME].appointments;

export default globalSlice.reducer;