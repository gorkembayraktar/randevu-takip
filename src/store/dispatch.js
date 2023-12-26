import store from './index'


import { 
    setCreateAppointmentModal,
    setCreateAppointmentModalProps,
    addAppointment as addAppointmentStore,
    removeAppointment as removeAppointmentStore
} from '../features/GlobalSlice'


const dispatch = (fn, state) => {{
    return store.dispatch(fn(state));
}}


export const createAppointmentModal = ( state ) => dispatch(setCreateAppointmentModal, state);
export const CreateAppointmentModalProps = ( state ) => dispatch(setCreateAppointmentModalProps, state);
export const addAppointment = ( state ) => dispatch(addAppointmentStore, state);
export const removeAppointment = ( state ) => dispatch(removeAppointmentStore, state);