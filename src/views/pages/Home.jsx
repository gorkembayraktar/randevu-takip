
import Container from '@mui/material/Container';

import Meeting from '../components/Meeting'
import CreateAppointment from '../components/modal/CreateAppointment'

import '../../index.css'

import { get_daily_data } from '../../data/constant';

import DeleteDialog from '../components/modal/DeleteDialog'
import { useState } from 'react';


const Home = () =>{
  const mode = 'dark';
  
  const [calendarEvents, setCalendarEvents] = useState(get_daily_data(7));

  const [deleteDialog, setDeleteDialog] = useState({
    info: null,
    title: 'Randevu Talebini silmek istiyor musunuz?',
    content: 'Bu işlemi onaylamak için sil düğmesine basınız.',
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
         <Container sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
               <Meeting calendarEvents={calendarEvents} setCalendarEvents={setCalendarEvents} showDialogDelete={showDialogDelete} />
               <CreateAppointment />
               <DeleteDialog deleteDialog={deleteDialog} handleDialogClose={handleDialogClose} handleDDConfirm={handleDDConfirm} />
         </Container>
      </>
  );
}


export default Home;