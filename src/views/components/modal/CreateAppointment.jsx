import { Box, Button, ButtonGroup, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { isVisibleCreateAppointmentModal } from "../../../features/GlobalSlice";

import { dispatch } from '../../../store'

export default function CreateAppointment(){

   // const [open, setOpen] = useState(false);
    const open = useSelector(isVisibleCreateAppointmentModal);

    const handleClose = () => dispatch.VisibleCreateAppointmentModal(false);

    return <div> <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Randevu Oluştur
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
                required
                id="outlined-required"
                label="Adı Soyadı"
                defaultValue=""
                fullWidth
                sx={{mb:1}}
                />
                <TextField
                required
                id="outlined-required"
                label="Telefonu"
                type="number"
                defaultValue=""
                fullWidth
                sx={{mb:1}}
                />
                <Grid container spacing={2}>
                    <Grid item  xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs(Date.now())} label="Randevu Tarihi" />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item  xs={6}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Saat"
                        type="time"
                        fullWidth
                        defaultValue={`${new Date().getHours()}:${new Date().getMinutes()}`}
                        sx={{mb:1}}
                        />
                    </Grid>
                </Grid>
            </Typography>
            <Divider  sx={{my:3}}/>
            <Typography id="modal-modal-footer" sx={{ mt: 2 }}>
                <ButtonGroup sx={{float:'right'}}>
                    <Button aria-label="delete" size="small" onClick={handleClose}>
                        Vazgeç
                    </Button >
                    <Button 
                    aria-label="delete" variant="outlined" size="small" color="success">
                        Oluştur
                    </Button >
                </ButtonGroup>
            </Typography>
        </Box>
    </Modal>
    </div>
}



const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};