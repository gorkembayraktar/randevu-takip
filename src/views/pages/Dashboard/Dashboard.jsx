import React from 'react';
import { Grid, Card, CardContent, Typography, Avatar, makeStyles, Box } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import DateRangeSharpIcon from '@mui/icons-material/DateRangeSharp';

import MyLineChart from './LineChart';
import TimerIcon from '@mui/icons-material/Timer';
import { useTitle } from '../../../hooks/useTitle';

const generateRandomData = () => {
    const data = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toLocaleDateString('tr-TR'); // Türkçe tarih formatı
        const total = Math.floor(Math.random() * 100) + 1; // 1 ile 100 arasında rastgele sayı oluştur
        data.push({ label: formattedDate, total });
    }
    return data;
};

const Dashboard = () => {

    useTitle('Gösterge Paneli');

    const cardItems = [
        {
            title: 'Yeni Randevu',
            icon: TimerIcon,
            value: 'Bugün 16:20, kalan süre: 15:20'
        },
        {
            title: 'Müşteriler',
            icon: PeopleIcon,
            value: 1
        },
        {
            title: 'Randevular',
            icon: DateRangeSharpIcon,
            value: 100
        }
    ];

    const lineChartData = generateRandomData();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    {cardItems.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ backgroundColor: '' }}>
                                <CardContent>
                                    <Grid
                                        alignItems="center"
                                        container
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Avatar>
                                                <item.icon />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <Typography noWrap variant="body" >{item.title}</Typography>
                                            {

                                                <Typography noWrap variant="body2">{item.value}</Typography>
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                    ))}
                </Grid>
                <Card sx={{ mt: 2 }}>
                    <CardContent>
                        <MyLineChart data={lineChartData} label='Randevular' />
                    </CardContent>
                </Card>


            </Grid>
        </Grid>
    );
};

export default Dashboard;
