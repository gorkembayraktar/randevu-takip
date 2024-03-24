import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Route, Routes } from 'react-router-dom';

import ListLeftMenu from './ListLeftMenu';
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';


import { routes } from '../../routes'
import AccountMenu from '../components/AccountMenu';
import { Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import { dispatch } from '../../store'
import DropdownLanguage from '../components/DropdownLanguage';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

function Template(props) {

  const { t } = useTranslation();

  const { window, element } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div >
      <Toolbar disableGutters sx={{ justifyContent: 'center', }}>
        <SlowMotionVideoIcon />
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            ml: 1,
            display: { md: 'flex', },
            fontFamily: 'monospace',
            fontWeight: 700,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Randevu Takip
        </Typography>
      </Toolbar>
      <Divider />
      <ListLeftMenu />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  const showCreateAppointment = () => {
    dispatch.createAppointmentModal({ show: true });
  }


  return (
    <Box sx={{ display: 'flex', zIndex: 999999, }}>
      <CssBaseline />
      <AppBar
        color="inherit"
        position="fixed"
        sx={{

          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">

          </Typography>
          <Button
            variant="outlined"
            color="info"
            size='small'
            startIcon={<CalendarMonthIcon />}
            onClick={showCreateAppointment}
          >
            {t('btn_add_appointment')}
          </Button>
          <Box sx={{ ml: 'auto', display: 'flex' }}>
            <DropdownLanguage />
            <AccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

        {
          element
        }
        <Box sx={{ height: 50, width: "100%" }}></Box>
      </Box>
    </Box>
  );
}

Template.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Template;