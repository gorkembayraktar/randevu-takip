import Navigation from './Navigation'
import CreateAppointment from "../components/modal/CreateAppointment"
import Header from "./Header"
import { Box } from "@mui/material"
import ScrollToTop from "../components/ScrollToTop"
import AppointmentCaraousel from '../components/AppointmentCarausel'
import { SnackbarProvider } from 'notistack';
import Template from "./Template"
export const AppLayout = ({element}) => {

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
    return <SnackbarProvider maxSnack={3}>
                <ScrollToTop />
                <Template element={element} />
                <CreateAppointment />
                <Navigation />
            </SnackbarProvider>
}