import store from './index'


import { 
    setCreateAppointmentModal,
    setCreateAppointmentModalProps
} from '../features/GlobalSlice'


export const createAppointmentModal = ( state ) => {
    return store.dispatch( setCreateAppointmentModal( state ) );
}
export const CreateAppointmentModalProps = ( state ) => {
    return store.dispatch( setCreateAppointmentModalProps( state ) );
}

