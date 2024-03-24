import AppBar from '@mui/material/AppBar';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Container from '@mui/material/Container';

import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import { getTheme } from '../../features/GlobalSlice';
import { useSelector } from 'react-redux';



const Header = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {

    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const theme = useSelector(getTheme);


    return (
        <>
            <AppBar position="static" style={{ background: theme === 'dark' ? 'rgb(38 38 39)' : '#2E3B55' }}>
                <Container >
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
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

                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

                            <Button sx={{ color: '#fff' }}>
                                Randevular
                            </Button>
                            <Button sx={{ color: '#fff' }}>
                                Ayarlar
                            </Button>
                            <Button sx={{ color: '#fff' }}>
                                Geçmiş
                            </Button>
                        </Box>
                        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                            <Button
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Typography sx={{ m: 1, textTransform: 'capitalize' }}>Görkem</Typography>
                                <AccountCircle />
                            </Button>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profil</MenuItem>
                                <MenuItem onClick={handleClose}>Çıkış Yap</MenuItem>
                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
            {/**
           * 
           <LeftMenu open={leftMenu} setOpen={leftMenuHandle}/>     
           */}
        </>
    );
}


export default Header;