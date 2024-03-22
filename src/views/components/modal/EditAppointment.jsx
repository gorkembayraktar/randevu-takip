import { Alert, Box, Button, ButtonGroup, Divider, Grid, Modal, TextField, Typography } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { getAppointments, getEditAppointmentModal } from "../../../features/GlobalSlice";

import { dispatch } from '../../../store'
import { memo, useEffect, useState } from "react";
import { AppointmentStatus, get_fake_appointment, setHours } from "../../../data/constant";
import { useAlert } from "../../../hooks/useAlert";

import { CenterModal, Title, Description, Footer } from './index'


function EditAppointment() {
    const { open, appointmentId } = useSelector(getEditAppointmentModal);
    // for dev
    const appointments = useSelector(getAppointments)

    const [data, setData] = useState({});

    const { error, success } = useAlert();

    const handleClose = () => dispatch.editAppointmentModal({ open: false });

    const handleEdit = () => {
        console.log("edit", data)
        if (data?.id) {
            dispatch.updateAppointment({
                id: data.id,
                data: {
                    ...data,
                    title: `${data?.name} - ${data?.phone}`,
                    start: setHours(new Date(data.date), data.time),
                    end: setHours(new Date(data.date), data.time)
                }
            });
            handleClose();
            success('Başarılı şekilde güncellendi.');
        }
    }

    const handleDelete = () => {
        if (data?.id) {
            dispatch.removeAppointment(data.id);
            success("Başarılı şekilde silindi.");
            handleClose();
        }
    }

    useEffect(() => {
        if (appointmentId > 0) {
            const find = appointments.find(a => a.id == appointmentId);
            if (!find) {
                error(`${appointmentId} numaralı kayıt bulunamadı.`);
                handleClose();
                return;
            }
            console.log("find", find)
            setData(find);
        }
    }, [appointmentId])


    const handleForm = (e) => {
        setFormItem(e.target.name, e.target.value);
    }
    const setFormItem = (name, value) => {
        setData({
            ...data,
            [name]: value
        });
    }



    if (appointmentId == 0) {
        return;
    }

    return <CenterModal open={open}>
        <Title>
            <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', py: 2, px: 1 }}>
                Randevu Düzenle
            </Typography>
        </Title>
        <Description>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Adı Soyadı"
                        fullWidth
                        value={data?.name}
                        onChange={handleForm}
                        name="name"
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Telefonu"
                        name="phone"
                        onChange={handleForm}
                        value={data?.phone}
                        fullWidth
                        size="small"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        name="email"
                        type="email"
                        onChange={handleForm}
                        value={data?.email}
                        fullWidth
                        size="small"
                    />
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            label="Randevu Tarihi"
                            name="date"
                            value={data?.date && dayjs(data.date)}
                            onChange={val => setFormItem('date', val)}
                            format="MM.DD.YYYY"
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label="Saat"
                        type="time"
                        fullWidth
                        value={data?.time}
                        name="time"
                        onChange={handleForm}
                        size="small"

                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        multiline
                        label="Not"
                        type="text"
                        rows={2}
                        fullWidth
                        name="note"
                        onChange={handleForm}
                        value={data?.note}
                        size="small"
                    />
                </Grid>


            </Grid>


        </Description>
        <Footer>
            <ButtonGroup sx={{ float: 'right' }}>

                {
                    new Date(data.date) > Date.now()

                    &&
                    <Button
                        aria-label="delete"
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={handleDelete}
                    >
                        İptal Et
                    </Button >
                }

                <Button aria-label="delete" size="small" onClick={handleClose}>
                    Vazgeç
                </Button >
                <Button
                    aria-label="delete"
                    variant="outlined"
                    size="small"
                    color="success"
                    onClick={handleEdit}
                >
                    Güncelle
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>
}


export default memo(EditAppointment)
