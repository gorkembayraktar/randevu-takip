
import Container from '@mui/material/Container';

import Meeting from '../components/Meeting'
import CreateAppointment from '../components/modal/CreateAppointment'

import '../../index.css'

import { get_daily_data } from '../../data/constant';

import DeleteDialog from '../components/modal/DeleteDialog'
import { useState } from 'react';
import { Alert, AlertTitle, Button } from '@mui/material';
import { Link } from 'react-router-dom';


const Home = () =>{
  const mode = 'dark';
  

  const [calendarEvents, setCalendarEvents] = useState(get_daily_data(7));

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
         <Container sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
                <Alert severity="info"
                 action={
                  <Button color="inherit" size="small" component={Link} to="/limit-dates">
                    Git
                  </Button>
                }>
                  <AlertTitle>Randevu Tarihlerini kısıtlamak için</AlertTitle>
                </Alert>
               <Meeting calendarEvents={calendarEvents} setCalendarEvents={setCalendarEvents} showDialogDelete={showDialogDelete} />
               <DeleteDialog deleteDialog={deleteDialog} handleDialogClose={handleDialogClose} handleDDConfirm={handleDDConfirm} />
         </Container>
      </>
  );
}


export default Home;