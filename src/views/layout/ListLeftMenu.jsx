import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider, ListSubheader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import DateRangeSharpIcon from '@mui/icons-material/DateRangeSharp';
import PeopleSharpIcon from '@mui/icons-material/PeopleSharp';
import RestoreSharpIcon from '@mui/icons-material/RestoreSharp';
import EditCalendarSharpIcon from '@mui/icons-material/EditCalendarSharp';
import BusinessSharpIcon from '@mui/icons-material/BusinessSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import TelegramIcon from '@mui/icons-material/Telegram';
import DashboardIcon from '@mui/icons-material/Dashboard';
const ROUTES = [
    {
        icon: <DashboardIcon />,
        to: '/',
        text: 'Gösterge Paneli'
    },
    {
        icon: <DateRangeSharpIcon />,
        to: '/appointments',
        text: 'Randevular'
    },
    {
        icon: <PeopleSharpIcon />,
        to: '/customers',
        text: 'Müşteriler'
    },
    {
        icon: <RestoreSharpIcon />,
        to: '/history',
        text: 'Geçmiş Randevular'
    },
    {
        icon: <EditCalendarSharpIcon />,
        to: '/limit-dates',
        text: 'İzinli Tarihler'
    },
    {
        icon: <BusinessSharpIcon />,
        to: '/holiday',
        text: 'Resmi Tatiller'
    },
    {
        icon: <SettingsSharpIcon />,
        to: '/setting',
        text: 'Ayarlar'
    }
]

const MODULES = [
    {
        icon: <TelegramIcon />,
        to: '/modules/telegram',
        text: 'Telegram'
    }
]


export const ListLeftMenu = () => {
    const location = useLocation();

    return <List>

        {ROUTES.map((ROUTE, index) => (
            <ListItem key={index} disablePadding component={Link} to={ROUTE.to} >
                <ListItemButton selected={location.pathname == ROUTE.to}>
                    <ListItemIcon>
                        {ROUTE.icon}
                    </ListItemIcon>
                    <ListItemText secondary={ROUTE.text} />
                </ListItemButton>
            </ListItem>
        ))}
        <Divider />
        <List dense>
            <ListSubheader>Modüller</ListSubheader>
            {MODULES.map((ROUTE, index) => (
                <ListItem key={index} disablePadding component={Link} to={ROUTE.to} >
                    <ListItemButton selected={location.pathname == ROUTE.to}>
                        <ListItemIcon>
                            {ROUTE.icon}
                        </ListItemIcon>
                        <ListItemText secondary={ROUTE.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>

        <Divider />
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary" align="center">
            {'Copyright © '}

            <Link to="https://smurftheme.net/" style={{ color: 'info', textDecoration: 'inherit' }} target="_blank" rel="noopener noreferrer" >
                Smurf Theme
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>

    </List>
}

export default ListLeftMenu