import { Alert, Button, ButtonGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import { CenterModal, Title, Description, Footer } from './index'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function CreateLimitDate({ open, close }) {

    const { t } = useTranslation();

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');

    const handleClose = () => {
        close();
    }
    const create = () => {

    }

    const checkDate = (date, name) => {
        if (name === 'startDate') {
            setStartDate(date);
        } else if (name === 'endDate') {
            setEndDate(date);
        }
    };

    useEffect(() => {
        if (startDate && endDate && endDate.isBefore(startDate)) {
            setError(
                t('The end date cannot be earlier than the start date!')
            );
        } else {
            setError('');
        }
    }, [startDate, endDate]);

    return <CenterModal open={open}>
        <Title>
            <Paper elevation={1} sx={{ mb: 3, p: 2 }}>
                <Typography fontFamily="revert" >
                    {t('limit_date.Set a Off Date')}
                </Typography>
            </Paper>
        </Title>
        <Description>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={t('limit_date.Start Date')}
                            slotProps={{ textField: { size: 'small' } }}
                            name="date"
                            minDate={dayjs().startOf('day')}
                            onChange={(date) => checkDate(date, 'startDate')}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label={t('limit_date.Start Hour')}
                        type="time"
                        size="small"
                        fullWidth
                        name="time"
                        sx={{ mb: 1 }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={t('limit_date.End Date')}
                            slotProps={{ textField: { size: 'small' } }}
                            name="date"
                            minDate={dayjs().startOf('day')}
                            onChange={(date) => checkDate(date, 'endDate')}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="outlined-required"
                        label={t('limit_date.End Hour')}
                        type="time"
                        size="small"
                        fullWidth
                        name="time"
                        sx={{ mb: 1 }}
                    />
                </Grid>
            </Grid>
            {
                error && <Alert severity="error">
                    {error}
                </Alert>
            }
            <TextField
                multiline
                label={t('limit_date.Note')}
                type="text"
                rows={2}
                fullWidth
                size="small"
                name="note"
                sx={{ mb: 1, mt: 1 }}
            />


        </Description>
        <Footer>
            <ButtonGroup sx={{ float: 'right' }}>
                <Button aria-label="delete" size="small" onClick={handleClose}>
                    {t('cancel')}
                </Button >
                <Button
                    onClick={create}
                    aria-label="delete" variant="outlined" size="small" color="success">
                    {t('create')}
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>


}

