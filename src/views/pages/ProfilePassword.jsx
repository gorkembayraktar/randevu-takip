
import { Box, Button, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material';
import { useTitle } from '../../hooks/useTitle'
import styled from '@emotion/styled';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ProfilePassword = () => {

  useTitle("Şifre Değiştir");



  return (
    <Grid container >
      <Grid item md={6}>
        <Item>
          <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', m: 2 }}>
            Şifre Değiştir
          </Typography>
          <Divider sx={{ my: 1 }} />


          <SectionProfile />

          <Divider sx={{ mt: 1 }} />
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Link to="/profile">
                <Button variant="text" size='small'>
                  Kullanıcı bilgileri
                </Button>
              </Link>
            </Grid>
            <Grid item>

              <Button variant="contained" color="success" sx={{ color: 'white' }} size='small'
                startIcon={<SaveIcon />}
                onClick={() => null}
              >
                Şifre güncelle
              </Button>

            </Grid>
          </Grid>

        </Item>
      </Grid>

    </Grid>
  );
}

const SectionProfile = () => {

  return (
    <Grid container spacing={1} justify="start" alignItems="center">
      <Grid item md={3}>
        <Typography variant="body">
          Mevcut Şifreniz
        </Typography>
      </Grid>
      <Grid item md={9}>
        <CustomPasswordField />
      </Grid>
      <Grid item md={3}>
        <Typography variant="body">
          Yeni Şifreniz
        </Typography>
      </Grid>
      <Grid item md={9}>
        <CustomPasswordField />
      </Grid>
      <Grid item md={3}>
        <Typography variant="body">
          Yeni Şifreniz Onay
        </Typography>
      </Grid>
      <Grid item md={9}>
        <CustomPasswordField />
      </Grid>
    </Grid>
  );
};


const CustomPasswordField = () => {


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  return (
    <FormControl fullWidth size='small' variant="outlined">
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default ProfilePassword;