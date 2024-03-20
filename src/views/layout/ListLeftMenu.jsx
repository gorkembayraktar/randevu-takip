import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TranslateIcon from '@mui/icons-material/Translate';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ListIcon from '@mui/icons-material/List';
import { Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';


const ROUTES = [
    {
        icon: <VideoSettingsIcon />,
        to: '/',
        text: 'Randevular'
    },
    {
        icon: <VideoSettingsIcon />,
        to: '/customers',
        text: 'Müşteriler'
    },
    {
        icon: <TranslateIcon />,
        to: '/history',
        text: 'Geçmiş Randevular'
    },
    {
        icon: <AudiotrackIcon />,
        to: '/limit-dates',
        text: 'İzinli Tarihler'
    },
    {
        icon: <FontDownloadIcon />,
        to: '/holiday',
        text: 'Resmi Tatiller'
    },
    {
        icon: <ListIcon />,
        to: '/setting',
        text: 'Ayarlar'
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