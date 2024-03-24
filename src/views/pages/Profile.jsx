
import { Button, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { useTitle } from '../../hooks/useTitle'
import styled from '@emotion/styled';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Profile = () => {

  useTitle("Profil");

  const { t } = useTranslation();

  const [editable, setEditable] = useState(false);


  return (
    <Grid container >
      <Grid item md={6}>
        <Item>
          <Typography fontFamily="revert" fontWeight="bold" sx={{ textAlign: 'left', m: 2 }}>
            {t('profile.title')}
          </Typography>
          <Divider sx={{ my: 1 }} />

          <SectionProfile editable={editable} />

          <Divider sx={{ mt: 1 }} />
          <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
            <Grid item>
              <Link to="/profile/password">
                <Button variant="outlined" size='small'>
                  {t('profile.btn_change_password')}
                </Button>
              </Link>
            </Grid>
            <Grid item>

              {
                !editable ?
                  <Button variant="contained" color="info" sx={{ color: 'white' }} size='small'
                    onClick={() => setEditable(true)}
                    startIcon={<EditIcon />}
                  >
                    {t('profile.btn_edit')}
                  </Button> :
                  <Button variant="contained" color="success" sx={{ color: 'white' }} size='small'
                    startIcon={<SaveIcon />}
                    onClick={() => setEditable(false)}
                  >
                    {t('profile.btn_save')}
                  </Button>
              }

            </Grid>
          </Grid>

        </Item>
      </Grid>

    </Grid>
  );
}

const SectionProfile = ({ editable }) => {

  const { t } = useTranslation();

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item md={3} xs={4}>
        <Typography variant="body" >
          {t('profile.username')}
        </Typography>
      </Grid>
      <Grid item md={9}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue="test"
          variant={!editable ? 'standard' : 'outlined'}
          InputProps={{ disableUnderline: !editable }}
          size="small"
          fullWidth
          disabled={!editable}
        />
      </Grid>
      <Grid item md={3} xs={4}>
        <Typography variant="body" justify="flex-start">
          {t('profile.fullname')}
        </Typography>
      </Grid>
      <Grid item md={9}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant={!editable ? 'standard' : 'outlined'}
          InputProps={{ disableUnderline: !editable }}
          defaultValue="test"
          size="small"
          fullWidth
          disabled={!editable}

        />
      </Grid>
      <Grid item md={3} xs={4}>
        <Typography variant="body" justify="flex-start">
          {t('profile.email')}
        </Typography>
      </Grid>
      <Grid item md={9}>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          variant={!editable ? 'standard' : 'outlined'}
          InputProps={{ disableUnderline: !editable }}
          defaultValue="test"
          size="small"
          fullWidth
          disabled={!editable}

        />
      </Grid>
    </Grid>
  );
};

export default Profile;