import { Box, Button, ButtonGroup, Divider, Grid, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { useEffect, useState } from "react";


import { DAYS, DAY_KEYS } from '../../../data/constant'

import { CenterModal, Title, Description, Footer } from './index'


export default function CreateWeeklyHour({ createWeeklyHourModal, setCreateWeeklyHourModal, onCreate }) {

    const { open } = createWeeklyHourModal;

    const handleClose = () => setCreateWeeklyHourModal({ ...createWeeklyHourModal, open: false });

    const [selectDay, setSelectDay] = useState(createWeeklyHourModal.day);
    const [hour, setHour] = useState();

    useEffect(() => {
        setSelectDay(createWeeklyHourModal.day);
    }, [createWeeklyHourModal])


    return <CenterModal open={open}>
        <Title>
            <Alert sx={{ mb: 1 }} severity="info" variant="filled">Randevu Saati Oluştur</Alert>
        </Title>
        <Description>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">Randevu Günü</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectDay}
                    onChange={(e) => setSelectDay(e.target.value)}
                >
                    {
                        DAY_KEYS.map(day => (
                            <MenuItem value={day}>{DAYS[day]}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
            <TextField
                required
                id="outlined-required"
                label="Saat"
                type="time"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                fullWidth
                sx={{ mb: 1 }}
            />

        </Description>
        <Footer>
            <ButtonGroup sx={{ float: 'right' }}>
                <Button aria-label="delete" size="small" onClick={handleClose}>
                    Vazgeç
                </Button >
                <Button
                    onClick={() => onCreate({ day: selectDay, hour })}
                    aria-label="delete" variant="outlined" size="small" color="success">
                    Oluştur
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>


}

