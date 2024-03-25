import Navigation from './Navigation'
import CreateAppointment from "../components/modal/CreateAppointment"
import EditAppointment from '../components/modal/EditAppointment'
//import Header from "./Header"
//import { Box } from "@mui/material"
import ScrollToTop from "../components/ScrollToTop"
import AppointmentCaraousel from '../components/AppointmentCarausel'
import Template from "./Template"
import MustLoginModal from '../components/modal/MustLoginModal'
export const AppLayout = ({ element }) => {

    /*
    return <>
        <ScrollToTop />
        <Header />
        {element}
        <Box sx={{height:100}}> </Box> 
        <CreateAppointment />
        <AppointmentCaraousel />
        <Navigation />
    </>
    */
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