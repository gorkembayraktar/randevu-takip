
import { Box, Button, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material';
import { useTitle } from '../../hooks/useTitle'
import styled from '@emotion/styled';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const ProfilePassword = () => {

  useTitle("Şifre Değiştir");
  const { t } = useTranslation();


  return (
    <Grid container >
      <Grid item md={6}>
        <Item>
          <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', m: 2 }}>
            {t('profile_password.btn_change_password')}
          </Typography>
          <Divider sx={{ my: 1 }} />


          <SectionProfile />

          <Divider sx={{ mt: 1 }} />
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Link to="/profile">
                <Button variant="text" size='small'>
                  <ArrowBackIosNewIcon color='default' />
                </Button>
              </Link>
            </Grid>
            <Grid item>

              <Button variant="contained" color="success" sx={{ color: 'white' }} size='small'
                startIcon={<SaveIcon />}
                onClick={() => null}
              >
                {t('profile_password.btn_save')}
              </Button>

            </Grid>
          </Grid>

        </Item>
      </Grid>

    </Grid>
  );
}

const SectionProfile = () => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={1} justify="start" alignItems="center">
      <Grid item md={3}>
        <Typography variant="body">
          {t('profile_password.password')}
        </Typography>
      </Grid>
      <Grid item md={9}>
        <CustomPasswordField />
      </Grid>
      <Grid item md={3}>
        <Typography variant="body">
          {t('profile_password.new_password')}
        </Typography>
      </Grid>
      <Grid item md={9}>
        <CustomPasswordField />
      </Grid>
      <Grid item md={3}>
        <Typography variant="body">
          {t('profile_password.new_password2')}
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