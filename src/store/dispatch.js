import store from './index'


import { 
    setTheme as setThemeStore,
    setCreateAppointmentModal,
    setCreateAppointmentModalProps,
    setEditAppointmentModal,
    addAppointment as addAppointmentStore,
    updateAppointment as updateAppointmentStore,
    removeAppointment as removeAppointmentStore
} from '../features/GlobalSlice'


const dispatch = (fn, state) => {{
    return store.dispatch(fn(state));
}}

export const setTheme = ( state ) => dispatch(setThemeStore, state);
export const createAppointmentModal = ( state ) => dispatch(setCreateAppointmentModal, state);
export const createAppointmentModalProps = ( state ) => dispatch(setCreateAppointmentModalProps, state);
export const editAppointmentModal = ( state ) => dispatch(setEditAppointmentModal, state);
export const addAppointment = ( state ) => dispatch(addAppointmentStore, state);
export const updateAppointment = ( state ) => dispatch(updateAppointmentStore, state);
export const removeAppointment = ( state ) => dispatch(removeAppointmentStore, state);