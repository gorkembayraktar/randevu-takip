import { Alert, Button, ButtonGroup, FormControlLabel, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { CenterModal, Title, Description, Footer } from './index'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";



export default function EditHoliday({ open, close, data }) {


    const { t, i18n } = useTranslation();
    dayjs.locale(i18n.language);


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');

    const handleClose = () => {
        close();
    }
    const create = () => {

    }

    useEffect(
        () => {
            if (data?.start) {
                setStartDate(dayjs(data.start));

            }
            if (data?.end) {
                setEndDate(dayjs(data.end));

            }
        },
        [data]
    );

    const checkDate = (date, name) => {
        if (name === 'startDate') {
            setStartDate(date);
        } else if (name === 'endDate') {
            setEndDate(date);
        }
    };

    useEffect(() => {
        if (startDate && endDate && endDate.isBefore(startDate)) {
            setError('Bitiş tarihi, başlangıç tarihinden önce olamaz!');
        } else {
            setError('');
        }
    }, [startDate, endDate]);

    return <CenterModal open={open}>
        <Title>
            <Paper elevation={1} sx={{ mb: 3, p: 2 }}>
                <Typography fontFamily="revert" >
                    {t('holiday.Edit Public Holiday')}
                </Typography>
            </Paper>
        </Title>
        <Description>

            <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={t('holiday.Start Date')}
                            slotProps={{ textField: { size: 'small' } }}
                            name="date"
                            onChange={(date) => checkDate(date, 'startDate')}
                            sx={{ width: '100%' }}
                            value={startDate}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>

            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label={t('holiday.End Date')}
                            slotProps={{ textField: { size: 'small' } }}
                            name="date"
                            onChange={(date) => checkDate(date, 'endDate')}
                            sx={{ width: '100%' }}
                            value={endDate}
                        />
                    </LocalizationProvider>
                </Grid>


            </Grid>
            <Stack alignItems='flex-end'>
                <FormControlLabel control={<Switch defaultChecked />} label={t('holiday.Renew every year')} />
            </Stack>


            {
                error && <Alert severity="error">
                    {error}
                </Alert>
            }


        </Description>
        <Footer>
            <ButtonGroup sx={{ float: 'right' }}>
                <Button aria-label="delete" size="small" onClick={handleClose}>
                    {t('cancel')}
                </Button >
                <Button
                    onClick={create}
                    aria-label="delete" variant="outlined" size="small" color="success">
                    {t('update')}
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>


}

