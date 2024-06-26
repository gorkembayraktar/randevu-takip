import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { FormControlLabel, Switch } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ITheme } from '../../identify/IScopes';
import { useSelector } from 'react-redux';
import { getTheme } from '../../features/GlobalSlice';
import { dispatch } from '../../store';
import { useTranslation } from 'react-i18next';

import { logout } from '../../store/utils'
import { useAuth } from '../../hooks/useAuth';

export default function AccountMenu() {

  const navigate = useNavigate();

  const user = useAuth();

  const { t } = useTranslation();

  const location = useLocation();

  const theme = useSelector(getTheme);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandle = () => {
    logout();
    navigate('/login');

  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.name[0]?.toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}

      >
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleClose}
          selected={location.pathname == '/profile'}
        >
          <Avatar /> {t('profile_menu')}
        </MenuItem>
        <Divider />
        {
          /**
            <MenuItem onClick={handleClose} >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
           */
        }

        <MenuItem >
          <FormControlLabel
            control={
              <Switch
                name="antoine"
                checked={ITheme.dark == theme}
                onClick={() => dispatch.setTheme(ITheme.dark == theme ? ITheme.light : ITheme.dark)} />
            }
            label={ITheme.dark == theme ? t('dark_theme') : t('light_theme')}
          />
        </MenuItem>
        <MenuItem onClick={logoutHandle}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
