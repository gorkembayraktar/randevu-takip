import { styled } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { Alert, Button, Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

import SearchIcon from '@mui/icons-material/Search';
import TodayIcon from '@mui/icons-material/Today';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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


export default function VisitorQuery() {


    const navigate = useNavigate();
    const [username, setUsername] = React.useState("");
    const [error, setError] = React.useState("");


    // Önümüzdeki 5 günü devre dışı bırakmak için bir işlev tanımlayalım
    const disableDates = (date) => {
        const today = dayjs();

        return date.day() === 6 || date.isBefore(today) || date.diff(today, 'days') < 5;
    };




    return (
        <Container dark sx={{ pt: 3 }} style={{ minHeight: "80vh" }} >

            <Grid alignItems='center' justifyContent='center' container >
                <Grid item md={6}>
                    <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column', }}  >
                        <Typography fontFamily="revert" variant="h4" gutterBottom>
                            Randevu Sorgula
                        </Typography>
                        <Typography fontFamily="revert" variant="body" gutterBottom>
                            Randevunuzu sorgulayabilmek için randevu numaranızı giriniz.
                        </Typography>
                        {
                            error &&
                            <Alert severity="error">{error}</Alert>
                        }

                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment">
                                Randevu Numaranız
                            </InputLabel>
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="input-with-icon-adornment"
                                endAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>



                        <Button variant="outlined">
                            Randevu Sorgula
                        </Button>

                        <Card >

                            <CardContent>
                                <Grid alignItems='center' container >
                                    <Grid item md={6}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Ahmet Veli
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Telefon: 05535 550 550
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Mail: test@test.com
                                        </Typography>
                                        <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                                            Oluşturuldu: 23.03.2024, 10:22
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} >

                                        <Typography sx={{ display: 'flex' }} variant="body2" color="text.secondary">
                                            <TodayIcon fontSize='small' />  Randevu Tarihi:
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            23.03.2024 10:22
                                        </Typography>
                                        <Button size='small' sx={{ mt: 1 }} variant="outlined" color="error" endIcon={<CancelIcon />}>
                                            İptal Et
                                        </Button>

                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                        <Card >

                            <CardContent>
                                <Grid alignItems='center' container >
                                    <Grid item md={6}>
                                        <Typography gutterBottom variant="h6" component="div">
                                            Ahmet Veli
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Telefon: 05535 550 550
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Mail: test@test.com
                                        </Typography>
                                        <Typography gutterBottom variant="body2" color="text.secondary" component="div">
                                            Oluşturuldu: 23.03.2024, 10:22
                                        </Typography>
                                    </Grid>
                                    <Grid item md={6} >

                                        <Typography sx={{ display: 'flex' }} variant="body2" color="text.secondary">
                                            <TodayIcon fontSize='small' />  Randevu Tarihi:
                                        </Typography>
                                        <Typography variant="h5" color="text.secondary">
                                            23.03.2024 10:22
                                        </Typography>
                                        <Button size='small' sx={{ mt: 1 }} variant="contained" color="success" endIcon={<CheckCircleIcon />}>
                                            Tamamlandı
                                        </Button>

                                    </Grid>
                                </Grid>

                            </CardContent>
                        </Card>

                        <Divider />
                        <Typography variant="body" gutterBottom>
                            Bir randevum yok!
                            <Button variant="text" style={{ textTransform: "none" }}>
                                <Link to="/" style={{ color: 'default', textDecoration: 'inherit' }} rel="noopener noreferrer" >
                                    Randevu oluştur
                                </Link>
                            </Button>

                        </Typography>



                    </Box>

                </Grid>
            </Grid>

        </Container>
    );
}