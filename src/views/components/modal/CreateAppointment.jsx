import { Button, ButtonGroup, Grid, TextField } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { getCreateAppointmentModal } from "../../../features/GlobalSlice";

import { dispatch } from '../../../store'
import { memo, useEffect, useState } from "react";
import { get_fake_appointment } from "../../../data/constant";
import { useAlert } from "../../../hooks/useAlert";

import {CenterModal, Title, Description, Footer} from './index'

function CreateAppointment(){

   // const [open, setOpen] = useState(false);
    const { show: open, date, hour, appointmentId } = useSelector(getCreateAppointmentModal);


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
        if(appointmentId){
            dispatch.removeAppointment(appointmentId);
        }
        success("Randevu oluşturuldu.");
        console.log("handleCreate", appointmentId)
        handleClose();
    }

    return   <CenterModal open={open}>
                <Title> Randevu Oluştur</Title>
                <Description>
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
                </Description>
                <Footer>
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
                </Footer>
            </CenterModal> 
}


export default memo(CreateAppointment)
