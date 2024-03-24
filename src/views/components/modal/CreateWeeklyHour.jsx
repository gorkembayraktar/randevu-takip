import { Box, Button, ButtonGroup, Divider, Grid, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem, Alert, Paper } from "@mui/material";
import { useEffect, useState } from "react";


import { DAYS, DAY_KEYS } from '../../../data/constant'

import { CenterModal, Title, Description, Footer } from './index'
import { useTranslation } from "react-i18next";


export default function CreateWeeklyHour({ createWeeklyHourModal, setCreateWeeklyHourModal, onCreate }) {

    const { t } = useTranslation();

    const { open } = createWeeklyHourModal;

    const handleClose = () => setCreateWeeklyHourModal({ ...createWeeklyHourModal, open: false });

    const [selectDay, setSelectDay] = useState(createWeeklyHourModal.day);
    const [hour, setHour] = useState();

    useEffect(() => {
        setSelectDay(createWeeklyHourModal.day);
    }, [createWeeklyHourModal])


    return <CenterModal open={open}>
        <Title>

            <Typography fontFamily="revert" sx={{ mb: 3, p: 2 }}>
                {t('settings.Create Appointment Time')}
            </Typography>

        </Title>
        <Description>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">{t('settings.Appointment Date')}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectDay}
                    onChange={(e) => setSelectDay(e.target.value)}
                    size="small"
                >
                    {
                        DAY_KEYS.map(day => (
                            <MenuItem value={day}>{t(`DAYS.${DAYS[day]}`)}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
            <TextField
                required
                id="outlined-required"
                label={t('settings.Appointment Hour')}
                type="time"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                fullWidth
                size="small"
                sx={{ mb: 1 }}
            />

        </Description>
        <Footer>
            <ButtonGroup sx={{ float: 'right' }}>
                <Button aria-label="delete" size="small" onClick={handleClose}>
                    {t('settings.cancel')}
                </Button >
                <Button
                    onClick={() => onCreate({ day: selectDay, hour })}
                    aria-label="delete" variant="outlined" size="small" color="success">
                    {t('settings.create')}
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>


}

