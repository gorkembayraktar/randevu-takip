import { styled } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Alert, Button, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    width: 400
};


export default function Visitor() {


    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [error, setError] = React.useState("");


    // Önümüzdeki 5 günü devre dışı bırakmak için bir işlev tanımlayalım
    const disableDates = (date) => {
        const today = dayjs();

        return date.day() === 6 || date.isBefore(today) || date.diff(today, 'days') < 5;
    };

    const [selectedChip, setSelectedChip] = React.useState(null);

    const handleChipClick = (value) => {
        setSelectedChip(value === selectedChip ? null : value);
    };

    const hours = [
        { id: 1, hour: '10:20', isAvailable: true },
        { id: 2, hour: '10:50', isAvailable: false },
        { id: 3, hour: '15:20', isAvailable: true }
    ];


    return (
        <Container dark sx={{ pt: 3 }} style={{ minHeight: "80vh" }} >

            <Grid alignItems='center' justifyContent='center' container >
                <Grid item md={6}>
                    <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', }}  >
                        <Typography fontFamily="revert" variant="h4" gutterBottom>
                            Randevu Oluştur
                        </Typography>
                        <Typography fontFamily="revert" variant="body" gutterBottom>
                            Randevunuzu oluşturabilmemiz için form bilgilerini doldurun.
                        </Typography>
                        {
                            error &&
                            <Alert severity="error">{error}</Alert>
                        }

                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Adınız Soyadınız
                            </InputLabel>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Telefon Numaranız
                            </InputLabel>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <PhoneIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Mail Adresiniz
                            </InputLabel>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <MailIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Randevu Tarihi"
                                slotProps={{ textField: { size: 'small', variant: "standard" } }}
                                name="date"
                                shouldDisableDate={disableDates}
                            />
                        </LocalizationProvider>
                        <Typography variant="body" gutterBottom>
                            Saat Seçiniz
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {
                                hours.map(
                                    h => <Chip
                                        key={h.id}
                                        disabled={!h.isAvailable}
                                        label={h.hour}
                                        color={
                                            selectedChip && selectedChip.id === h.id ? 'primary' :
                                                'default'}
                                        onClick={() => setSelectedChip(h)}
                                        sx={{
                                            '& span': {
                                                textDecoration: h.isAvailable ? 'none' : 'line-through'
                                            }
                                        }}
                                    />


                                )
                            }
                        </Stack>


                        <Button variant="outlined">
                            Randevu Oluştur
                        </Button>

                        <Divider />
                        <Typography variant="body" gutterBottom>
                            Zaten bir randevunuz var mı?
                            <Button variant="text" style={{ textTransform: "none" }}>
                                <Link to="/appointment-search" style={{ color: 'default', textDecoration: 'inherit' }} rel="noopener noreferrer" >
                                    Randevu sorgula
                                </Link>
                            </Button>

                        </Typography>

                    </Box>

                </Grid>
            </Grid>

        </Container>
    );
}