import { Alert, Button, ButtonGroup, FormControlLabel, Grid, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { CenterModal, Title, Description, Footer } from './index'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function CreateHoliday({ open, close }) {
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
            setError('Bitiş tarihi, başlangıç tarihinden önce olamaz!');
        } else {
            setError('');
        }
    }, [startDate, endDate]);

    return <CenterModal open={open}>
        <Title>
            <Paper elevation={1} sx={{ mb: 3, p: 2 }}>
                <Typography fontFamily="revert" >
                    Resmi Tatil Ekleyin
                </Typography>
            </Paper>
        </Title>
        <Description>

            <Grid container spacing={2} sx={{ mb: 1 }}>
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Başlangıç Tarihi"
                            slotProps={{ textField: { size: 'small' } }}
                            name="date"
                            minDate={dayjs().startOf('day')}
                            onChange={(date) => checkDate(date, 'startDate')}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>

            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Bitiş Tarihi"
                            slotProps={{ textField: { size: 'small' } }}
                            name="date"
                            minDate={dayjs().startOf('day')}
                            onChange={(date) => checkDate(date, 'endDate')}
                            sx={{ width: '100%' }}
                        />
                    </LocalizationProvider>
                </Grid>


            </Grid>
            <Stack alignItems='flex-end'>
                <FormControlLabel control={<Switch defaultChecked />} label="Her yıl yenile" />
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
                    Vazgeç
                </Button >
                <Button
                    onClick={create}
                    aria-label="delete" variant="outlined" size="small" color="success">
                    Oluştur
                </Button >
            </ButtonGroup>
        </Footer>
    </CenterModal>


}

