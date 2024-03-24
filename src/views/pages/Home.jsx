
import Container from '@mui/material/Container';

import Meeting from '../components/Meeting'
import CreateAppointment from '../components/modal/CreateAppointment'

import '../../index.css'

import { get_daily_data } from '../../data/constant';

import DeleteDialog from '../components/modal/DeleteDialog'
import { useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTitle } from '../../hooks/useTitle';
import { useSelector } from 'react-redux';
import { getAppointments } from '../../features/GlobalSlice';
import { useTranslation } from 'react-i18next';


const Home = () => {

  const { t } = useTranslation();

  useTitle(
    t('home.Appointments')
  );


  const calendarEvents = useSelector(getAppointments);

  const setCalendarEvents = () => {

  }

  const [deleteDialog, setDeleteDialog] = useState({
    info: null,
    title: t('home.Do you want to cancel the Appointment Request?'),
    content: t('home.Press the cancel button to confirm this action.'),
    open: false
  });

  const showDialogDelete = (info) => {
    setDeleteDialog({
      ...deleteDialog,
      open: true,
      info
    })
  }

  const handleDialogClose = () => {
    setDeleteDialog(
      {
        ...deleteDialog,
        open: false
      }
    )
  }
  const handleDDConfirm = () => {
    const id = deleteDialog.info.id;
    if (!id) {
      handleDialogClose();
      return;
    }
    const filter = calendarEvents.filter(c => {
      return (c.id != id);
    });
    setCalendarEvents(
      [...filter]
    );
    handleDialogClose();
  }

  return (
    <>
      <Meeting calendarEvents={calendarEvents} setCalendarEvents={setCalendarEvents} showDialogDelete={showDialogDelete} />
      <DeleteDialog props={deleteDialog} close={handleDialogClose} confirm={handleDDConfirm} />
    </>
  );
}


export default Home;