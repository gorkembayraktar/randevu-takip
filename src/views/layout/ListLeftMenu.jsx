import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TranslateIcon from '@mui/icons-material/Translate';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import ListIcon from '@mui/icons-material/List';
import BurstModeIcon from '@mui/icons-material/BurstMode';
import { Divider, ListSubheader } from '@mui/material';
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
                        { ROUTE.icon }
                    </ListItemIcon>
                    <ListItemText  secondary={ROUTE.text} />
                    </ListItemButton>
                </ListItem>
                ))}

                <Divider />

            </List>
}

export default ListLeftMenu