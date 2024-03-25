import store from './index'


import {
    login as loginFunc,
    logout as logoutFunc,
    mustLogin as mustLoginFunc
} from '../features/AuthSlice'

export const login = ( state ) => {
    return store.dispatch( loginFunc( state ) );
}
export const logout = () => {
    return store.dispatch( logoutFunc( ) );
}

/**
 * API if return response code 401, then must relogin the current user.
 * @returns 
 */
export const mustLogin = (state) => {
    return store.dispatch( mustLoginFunc(state) );
}

