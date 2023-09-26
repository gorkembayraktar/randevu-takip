import { Box, Button, ButtonGroup, Divider, Grid, Modal, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import {DAYS, DAY_KEYS} from '../../../data/constant'


export default function CreateWeeklyHour({createWeeklyHourModal, setCreateWeeklyHourModal, onCreate}){

    const {open} = createWeeklyHourModal;

    const handleClose = () => setCreateWeeklyHourModal({...createWeeklyHourModal, open: false});

    const [selectDay, setSelectDay] = useState(createWeeklyHourModal.day);
    const [hour, setHour] = useState();

    useEffect(()=>{
        setSelectDay(  createWeeklyHourModal.day );
    },[createWeeklyHourModal])


    return <div> <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Randevu Saati Oluştur
            </Typography>
            
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            <FormControl fullWidth sx={{mb:2}}>
                <InputLabel id="demo-simple-select-standard-label">Randevu Günü</InputLabel>
                    <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={selectDay}
                    onChange={(e) =>  setSelectDay(e.target.value)}
                     >
                     {
                        DAY_KEYS.map(day => (
                            <MenuItem value={day}>{ DAYS[day] }</MenuItem>
                        ))
                     }

                </Select>
            </FormControl>

                <TextField
                required
                id="outlined-required"
                label="Saat"
                type="time"
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                fullWidth
                sx={{mb:1}}
                />
                
            </Typography>
            <Divider  sx={{my:3}}/>
            <Typography id="modal-modal-footer" sx={{ mt: 2 }}>
                <ButtonGroup sx={{float:'right'}}>
                    <Button aria-label="delete" size="small" onClick={handleClose}>
                        Vazgeç
                    </Button >
                    <Button 
                    onClick={() => onCreate({day: selectDay, hour})}
                    aria-label="delete" variant="outlined" size="small" color="success">
                        Oluştur
                    </Button >
                </ButtonGroup>
            </Typography>
        </Box>
    </Modal>
    </div>
}



const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};