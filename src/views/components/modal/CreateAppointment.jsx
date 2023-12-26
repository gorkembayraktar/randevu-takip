import { Box, Button, ButtonGroup, Divider, Grid, Modal, TextField, Typography } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { getCreateAppointmentModal } from "../../../features/GlobalSlice";

import { dispatch } from '../../../store'
import { memo, useEffect, useState } from "react";
import { AppointmentStatus, get_fake_appointment } from "../../../data/constant";
import { useAlert } from "../../../hooks/useAlert";
import { useSnackbar } from "notistack";

function CreateAppointment(){

   // const [open, setOpen] = useState(false);
    const { show: open, date, hour } = useSelector(getCreateAppointmentModal);


    console.log("CreateAppointment", open, date, hour)

    const handleClose = () => dispatch.createAppointmentModal({show: false});


    const { success } = useAlert();
    

    const [form, setForm] = useState({});

    useEffect(() =>{
        setForm({
            name: '',
            phone: '',
            date: (date && dayjs(date)) || dayjs(Date.now()),
            time: hour || `${new Date().getHours()}:${new Date().getMinutes()}`,
            note: ''
        });
    },[open])

    const handleForm = (e) => {
        setFormItem(e.target.name, e.target.value);
    }
    const setFormItem = (name, value) => {
        setForm({
            ...form,
            [name]: value
        });
    }


    const handleCreate = () => {
     
        dispatch.addAppointment(get_fake_appointment(form))

        success("merhaba " +  form.name);
    }
  
    return  <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Randevu Oluştur
            </Typography>
            <div id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
                required
                id="outlined-required"
                label="Adı Soyadı"
                fullWidth
                value={form.name}
                name="name"
                onChange={handleForm}
                sx={{mb:1}}
                />
                <TextField
                required
                id="outlined-required"
                label="Telefonu"
                type="number"
                name="phone"
                onChange={handleForm}
                fullWidth
                sx={{mb:1}}
                />
                <Grid container spacing={2}>
                    <Grid item  xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                        value={form.date} 
                        label="Randevu Tarihi"
                        name="date"
                        onChange={(newValue) => setFormItem('date', dayjs(newValue).format("MM.DD.YYYY"))}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item  xs={6}>
                        <TextField
                        required
                        id="outlined-required"
                        label="Saat"
                        type="time"
                        fullWidth
                        value={form.time}
                        name="time"
                        onChange={handleForm}
                        sx={{mb:1}}
                        />
                    </Grid>
                </Grid>

                <TextField
                multiline
                label="Not"
                type="text"
                rows={2}
                value={form.note}
                fullWidth
                name="note"
                onChange={handleForm}
                sx={{mb:1}}
                />
            </div>
            <Divider  sx={{my:3}}/>
            <div id="modal-modal-footer" sx={{ mt: 2 }}>
                <ButtonGroup sx={{float:'right'}}>
                    <Button aria-label="delete" size="small" onClick={handleClose}>
                        Vazgeç
                    </Button >
                    <Button 
                    aria-label="delete" 
                    variant="outlined" 
                    size="small" 
                    color="success"
                    onClick={handleCreate}
                    >
                        Oluştur
                    </Button >
                </ButtonGroup>
            </div>
        </Box>
    </Modal>
}


export default memo(CreateAppointment)


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