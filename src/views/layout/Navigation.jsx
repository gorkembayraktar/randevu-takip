import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
//import BlockIcon from '@mui/icons-material/Block';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { dispatch } from '../../store'

export default function SimpleBottomNavigation() {
 const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const showCreateAppointment = () => {
    dispatch.createAppointmentModal({show: true});
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none',  md: 'none', lg: 'none'}}} elevation={3}>
      <BottomNavigation
        showLabels
        sx={{boxShadow: 2,}}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue)
        }}
      >
        <BottomNavigationAction value="/history"  component={Link} to="/history" label="Geçmiş" icon={<RestoreIcon />} />
        <BottomNavigationAction value="/" component={Link} to="/" label="Randevular" icon={<CalendarMonthIcon />} />
        <BottomNavigationAction label="Yeni Randevu" icon={<CalendarMonthIcon />}  onClick={ showCreateAppointment } />
        {/*<BottomNavigationAction value="/limit-dates"  component={Link} to="/limit-dates" label="Tarih Kısıtlama" icon={<BlockIcon />} /> */}
        <BottomNavigationAction value="/setting"  component={Link} to="/setting" label="Ayarlar" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}