import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from 'react-i18next';
import { mustLogin, logout } from '../../../store/utils';
import { useSelector } from 'react-redux';
import { getMustLogin } from '../../../features/AuthSlice';
import { useAlert } from '../../../hooks/useAlert';
import { useNavigate } from 'react-router-dom';

export default function MustLoginModal() {
  const { t } = useTranslation();
  const { info } = useAlert();
  const navigate = useNavigate();

  const open = useSelector(getMustLogin);

  const handleClose = () => {
    //
  };

  const confirm = () => {
    logout();
    mustLogin(false);
    navigate('/login');
    info('Çıkış yapıldı');
  }

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('dialog.must_login.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('dialog.must_login.content')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>


          <Button onClick={confirm} color="success">
            {t('dialog.must_login.confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}