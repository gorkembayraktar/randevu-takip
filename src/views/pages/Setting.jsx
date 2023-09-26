
import { Alert, Box, Button, ButtonGroup, Chip, Collapse, Divider, Grid, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Paper, TextField, Tooltip, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';

import {randevu_saatleri, DAYS, DAY_KEYS} from '../../data/constant'

import {ByGroupByData} from '../../utils/array'

import CreateWeeklyHour from '../components/modal/CreateWeeklyHour'

import { Link } from 'react-router-dom';
import { useState } from 'react';




const Setting = () =>{
  
  const [data, setData] = useState(randevu_saatleri);

  const dataNewView = ByGroupByData(DAY_KEYS, data, 'day');

  const onCreate = ({day, hour}) => {
    if(hour == "") return;
    
    if( data.find(i => i.day == day && i.hour == hour) ){
        return alert("Böyle bir saat dilimi mevcut.");
    }
    setData([
        ...data,
        {
            id: Date.now(),
            hour: hour,
            day: day,
            notAvailable: false
        }
    ])

    hideCreateWeeklyHour();
  }

  const onAvailable = (item) => {
    setData(
        data.map(i => {
            if(item.id == i.id) i.notAvailable=!i.notAvailable;
            return i;
        })
    )
  }

  const onDelete = (item) => {
    setData(
        data.filter(i => i.id !== item.id )
    )
  }

  const [createWeeklyHourModal, setCreateWeeklyHourModal] = useState({
    day: 1,
    open: false,
  });
 
  const showCreateWeeklyHour = (day = 1) => {
    setCreateWeeklyHourModal({
        ...createWeeklyHourModal,
        day: day,
        open: true
    })
  }
  const hideCreateWeeklyHour = () => {
    setCreateWeeklyHourModal({
        ...createWeeklyHourModal,
        open: false
    })
  }

  const mode = 'dark';
  return (
      <>
         <Container sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
            <Grid container spacing={2}>
                <Grid item md={5} xs={12}>
                    <List
                        sx={{ width: '100%', bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="h2" sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}  id="nested-list-subheader">
                                Haftalık Randevu Saatleri
                                <IconButton onClick={ () => showCreateWeeklyHour(1)}>
                                        <AddIcon />
                                </IconButton>
                            </ListSubheader>
                        }
                    
                        >
                        {
                            Object.entries(dataNewView).map(([day, item]) =>(
                            <>
                                 <ListItemButton>
                                    <ListItemIcon>
                                        <EventIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={ DAYS[day] } onClick={() => showCreateWeeklyHour(day)} />
                                   
                                </ListItemButton>
                                {
                                <Box sx={{p:0, ml:8, mt: 1}}>
                                   <ViewWeeklyHour onDelete={onDelete} onAvailable={onAvailable} randevu_saatleri={item} />
                                </Box>
                                }
                            </>
                           )) 
                        }
                    </List>
                   
                    <Divider  sx={{my:3}}/>
                 
                </Grid>
                <Grid item md={4} xs={12}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Telegram API Ayarları
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    
                        <TextField
                            required
                            id="outlined-required"
                            label="TOKEN"
                            defaultValue=""
                            sx={{mb:2}}
                            fullWidth
                        />
                    
                    </Typography>
                    <Divider  sx={{my:3}}/>
                    <ButtonGroup sx={{float:'right'}}>
                            <Button 
                        
                            aria-label="delete" variant="outlined" size="small" color="success" >
                                Kaydet
                            </Button >
                    </ButtonGroup>
                </Grid>
            </Grid>

            <CreateWeeklyHour createWeeklyHourModal={createWeeklyHourModal} setCreateWeeklyHourModal={setCreateWeeklyHourModal} onCreate={onCreate} />
         </Container>
      </>
  );
}


const ViewWeeklyHour = ({randevu_saatleri, onDelete, onAvailable}) => {

    if(randevu_saatleri.length == 0)
        return <Alert severity="info">Saat bulunmuyor.</Alert>;
   

    return randevu_saatleri.map(saat =>(
        <Tooltip title={ saat.notAvailable ? 'Saat Etkin değil' : 'Saat Etkin' }>
            <Chip onClick={() => onAvailable(saat)}  sx={{cursor:'pointer'}} label={saat.hour} color={saat.notAvailable ? 'default' : 'success'}  onDelete={() => onDelete(saat)}/>
        </Tooltip>
    ))  
}


export default Setting;