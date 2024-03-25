import Navigation from './Navigation'
import CreateAppointment from "../components/modal/CreateAppointment"
import EditAppointment from '../components/modal/EditAppointment'
//import Header from "./Header"
//import { Box } from "@mui/material"
import ScrollToTop from "../components/ScrollToTop"
import AppointmentCaraousel from '../components/AppointmentCarausel'
import Template from "./Template"
import MustLoginModal from '../components/modal/MustLoginModal'
import { useEffect } from 'react'
import { getProfileInfo } from '../../api'
import { useAuth } from '../../hooks/useAuth'

import {
    login as loginStore
} from '../../store/utils'

export const AppLayout = ({ element }) => {

    const user = useAuth();

    useEffect(() => {

        getProfileInfo().then(data => {
            loginStore({
                ...user,
                ...data
            })
        }).catch(null);

    }, [])

    return <>
        <ScrollToTop />
        <Template element={element} />
        <CreateAppointment />
        <EditAppointment />
        <AppointmentCaraousel />
        <Navigation />
        <MustLoginModal />
    </>
}