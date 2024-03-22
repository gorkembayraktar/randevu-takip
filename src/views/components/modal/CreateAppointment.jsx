import { Alert, Autocomplete, Box, Button, ButtonGroup, Grid, IconButton, Input, InputAdornment, OutlinedInput, TextField, Tooltip, Typography } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSelector } from "react-redux";
import { getCreateAppointmentModal } from "../../../features/GlobalSlice";

import { dispatch } from '../../../store'
import { memo, useEffect, useRef, useState } from "react";
import { get_fake_appointment } from "../../../data/constant";
import { useAlert } from "../../../hooks/useAlert";
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { CenterModal, Title, Description, Footer } from './index'
import PersonIcon from '@mui/icons-material/Person';
import TextFieldSearchCustomer from "../TextFieldSearchCustomer";
import CreateCustomer from "./CreateCustomer";


function CreateAppointment() {

    const { show: open, date, hour, appointmentId } = useSelector(getCreateAppointmentModal);


    console.log("CreateAppointment", open, date, hour)

    const handleClose = () => dispatch.createAppointmentModal({ show: false });


    const { success } = useAlert();

    const [value, setValue] = useState(null);
    const [form, setForm] = useState({});

    const [openCreateCustomer, setOpenCreateCustomer] = useState(false);

    useEffect(() => {
        setForm({
            name: '',
            phone: '',
            date: (date && dayjs(date)) || dayjs(Date.now()),
            time: hour || `${new Date().getHours()}:${new Date().getMinutes()}`,
            note: ''
        });
    }, [open])

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
        if (appointmentId) {
            dispatch.removeAppointment(appointmentId);
        }
        success("Randevu oluşturuldu.");
        console.log("handleCreate", appointmentId)
        handleClose();
    }



    return <>
        <CenterModal open={open}>
            <Title>
                <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', py: 2, px: 1 }}>
                    Yeni Randevu Oluştur
                </Typography>
            </Title>
            <Description>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextFieldSearchCustomer value={value} setValue={setValue} addNewCustomer={() => setOpenCreateCustomer(true)} />
                    </Grid>
                    <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={form.date}
                                label="Randevu Tarihi"
                                slotProps={{ textField: { size: 'small' } }}
                                name="date"
                                minDate={dayjs().startOf('day')}
                            //onChange={(newValue) => setFormItem('date', dayjs(newValue).format("MM.DD.YYYY"))}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Saat"
                            type="time"
                            size="small"
                            fullWidth
                            value={form.time}
                            name="time"
                            onChange={handleForm}
                            sx={{ mb: 1 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            multiline
                            label="Not"
                            type="text"
                            rows={2}
                            value={form.note}
                            fullWidth
                            size="small"
                            name="note"
                            onChange={handleForm}

                        />
                    </Grid>
                </Grid>


            </Description>
            <Footer>
                <ButtonGroup sx={{ float: 'right' }}>
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

        <CreateCustomer
            open={openCreateCustomer}
            close={() => setOpenCreateCustomer(false)}
            onsuccess={() => {

            }}
        />
    </>





}



const SearchCustomizeInput = () => {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const loaded = useRef(false);

    useEffect(() => {
        setOptions(
            [
                {
                    name: 'Görkem',
                    phone: '055555',
                }
            ]
        );
    }, [inputValue])

    return (
        <Autocomplete
            id="search-customer"
            sx={{ width: 300 }}
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="Müşteri bulunamadı"
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                //setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField  {...params} label="Müşteri Seç/Oluştur" size="small" fullWidth />
            )}
            renderOption={(props, option) => {


                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <PersonIcon sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                <Box
                                    component="span"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {option.name}
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {option.phone}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}


export default memo(CreateAppointment)
