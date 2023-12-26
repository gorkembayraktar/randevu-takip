
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


const Home = () =>{
  const mode = 'dark';
  useTitle("Randevular");

 
  const calendarEvents = useSelector(getAppointments);

  const setCalendarEvents = () => {
    
  }

  const [deleteDialog, setDeleteDialog] = useState({
    info: null,
    title: 'Randevu Talebini iptal etmek istiyor musunuz?',
    content: 'Bu işlemi onaylamak için iptal düğmesine basınız.',
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
    if(!id) {
      handleDialogClose();
      return;
    }
    const filter = calendarEvents.filter(c => {
      return  (c.id != id);
     });
    setCalendarEvents(
      [...filter]
    );
    handleDialogClose();
  }

  return (
      <>
        <Meeting calendarEvents={calendarEvents} setCalendarEvents={setCalendarEvents} showDialogDelete={showDialogDelete} />
        <DeleteDialog deleteDialog={deleteDialog} handleDialogClose={handleDialogClose} handleDDConfirm={handleDDConfirm} />
      </>
  );
}


export default Home;