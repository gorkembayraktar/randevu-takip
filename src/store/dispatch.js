import store from './index'


import { 
    setVisibleCreateAppointmentModal
} from '../features/GlobalSlice'


export const VisibleCreateAppointmentModal = ( state ) => {
    return store.dispatch( setVisibleCreateAppointmentModal( state ) );
}