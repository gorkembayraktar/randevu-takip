import { Box, Button, Chip, Fade, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useRef, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { Slide } from '@mui/material';


const BUGUN_RANDEVULAR = [
  {
    id: 1,
    saat: "10:20",
    title: "Mehmet 053555525"
  },
  {
    id: 2,
    saat: "13:10",
    title: "Veli 053555525"
  },
  {
    id: 3,
    saat: "16:20",
    title: "Hakan 053555525"
  }
];

export const AppointmentCaraousel = () => {

    const [data, setData] = useState(BUGUN_RANDEVULAR);
    const [selectedIndis, setSelectedIndis] = useState(0);
    const currenData = data[ selectedIndis ] ? data[ selectedIndis ] : null;

    const prev = () => {
      setSelectedIndis( Math.max(selectedIndis - 1,0)  );
    }
    const next = () => {
      setSelectedIndis( Math.min(selectedIndis + 1, data.length - 1) );
    }

    const hasNext = selectedIndis + 1 < data.length;
    const hasPrev = selectedIndis - 1 >= 0;

    return <>
    <Paper sx={{ position: 'fixed', bottom: { xs:55, sm: 0, md: 0}, left: 0, right: 0, py:1, display: 'block'}} elevation={3}>
      <Grid container spacing={1}>
          <Grid item xs={1} sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <IconButton onClick={prev} disabled={!hasPrev}>
                <NavigateBeforeIcon />
              </IconButton>
          </Grid>
          <Grid item xs={10} container>
              {
               currenData && <AppointmentItem item={currenData} />
              }
          </Grid>
          
          <Grid item xs={1} sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
              <IconButton onClick={next} disabled={!hasNext}>
                <NavigateNextIcon />
              </IconButton>
          </Grid>
        </Grid>

    </Paper>
    </>
}

const AppointmentItem = ({item}) => {
  return <React.Fragment>
       <Grid item xs={11} >
        <Box sx={{ fontWeight: 'bold', userSelect: 'none', display: 'flex', alignItems: 'center', gap: 1 }}> 
          <AccessTimeIcon sx={{fontSize: 15}} /> 
          {item.saat} 
           <Chip size="small" label="10 dakika kaldı" />
        </Box>
        <span> {item.title}</span>
      </Grid>
      <Grid item xs={1} sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Tooltip title="Randevuyu iptal et">
            <IconButton sx={{float: 'right'}}>
              <CancelIcon />
            </IconButton>
        </Tooltip>
      </Grid>
  </React.Fragment>
}

export default AppointmentCaraousel;