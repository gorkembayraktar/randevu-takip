import store from './index'


import {
    login as loginFunc,
    logout as logoutFunc
} from '../features/AuthSlice'

export const login = ( state ) => {
    return store.dispatch( loginFunc( state ) );
}
export const logout = () => {
    return store.dispatch( logoutFunc( ) );
}