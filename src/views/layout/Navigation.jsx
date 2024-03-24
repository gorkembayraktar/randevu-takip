import * as React from 'react';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
//import BlockIcon from '@mui/icons-material/Block';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SettingsIcon from '@mui/icons-material/Settings';
import UserIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { dispatch } from '../../store'
import { useTranslation } from 'react-i18next';

export default function SimpleBottomNavigation() {

  const { t } = useTranslation();
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  const showCreateAppointment = () => {
    dispatch.createAppointmentModal({ show: true });
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', sm: 'none', md: 'none', lg: 'none' } }} elevation={3}>
      <BottomNavigation
        showLabels
        sx={{ boxShadow: 2, }}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          console.log(newValue)
        }}
      >
        <BottomNavigationAction value="/history" component={Link} to="/history" label={t('bottom_menu.History')} icon={<RestoreIcon />} />
        <BottomNavigationAction value="/appointments" component={Link} to="/appointments" label={t('bottom_menu.Appointments')} icon={<CalendarMonthIcon />} />
        <BottomNavigationAction label={t('Add Appointment')} icon={<CalendarMonthIcon />} onClick={showCreateAppointment} />
        {/*<BottomNavigationAction value="/limit-dates"  component={Link} to="/limit-dates" label="Tarih Kısıtlama" icon={<BlockIcon />} /> */}
        <BottomNavigationAction value="/setting" component={Link} to="/setting" label={t('bottom_menu.Settings')} icon={<SettingsIcon />} />
        <BottomNavigationAction value="/profile" component={Link} to="/profile" label={t('bottom_menu.Profile')} icon={<UserIcon />} />
      </BottomNavigation>
    </Paper>
  );
}