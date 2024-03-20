import { Badge, Box, Button, Chip, Container, Fade, Grid, IconButton, LinearProgress, Paper, Tooltip, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useEffect, useRef, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { useSwipeable } from "react-swipeable";
import DeleteDialog from "./modal/DeleteDialog";
import { useAlert } from "../../hooks/useAlert";


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
  const currenData = data[selectedIndis] ? data[selectedIndis] : null;
  const [selectedRow, setSelectedRow] = useState(null);
  const { success, alert, info } = useAlert();

  if (data.length == 0)
    return null;

  const prev = () => {
    setSelectedIndis(Math.max(selectedIndis - 1, 0));
  }
  const next = () => {
    setSelectedIndis(Math.min(selectedIndis + 1, data.length - 1));
  }

  const handleCancel = () => {

    if (data.findIndex((k) => k.id == selectedRow.id) == data.length - 1) {
      prev();
    }

    setData(
      data.filter(
        item => item.id !== selectedRow.id
      )
    )

    info('Başarılı şekilde iptal edildi.');
    setSelectedRow(null);
  };



  const hasNext = selectedIndis + 1 < data.length;
  const hasPrev = selectedIndis - 1 >= 0;
  const prevCount = selectedIndis;
  const nextCount = data.length - selectedIndis - 1;
  const progress = Math.ceil((selectedIndis) / (data.length - 1) * 100);

  return <>
    <Paper sx={{ zIndex: { md: 1300, sm: 999 }, position: 'fixed', bottom: { xs: 55, sm: 0, md: 0 }, left: 0, right: 0, py: 1, display: 'block' }} elevation={3}>
      <Container>
        <Grid container spacing={1}>
          <Grid item sx={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={prev} disabled={!hasPrev}>
              <Badge badgeContent={prevCount} color="success"  >
                <NavigateBeforeIcon />
              </Badge>
            </IconButton>

          </Grid>
          <Grid item sx={{ width: 'auto', flex: 1 }} container >
            {
              currenData && <AppointmentItem item={currenData} next={next} prev={prev} setRow={setSelectedRow} />
            }
          </Grid>

          <Grid item sx={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconButton onClick={next} disabled={!hasNext}>
              <Badge badgeContent={nextCount} color="success"  >
                <NavigateNextIcon />
              </Badge>
            </IconButton>

          </Grid>
        </Grid>
        <LinearProgress color="success" variant="determinate" value={progress} />
      </Container>
    </Paper>
    <DeleteDialog
      props={{
        open: selectedRow !== null,
        title: "İşlem Onayı",
        content: "Bu randevuyu iptal etmek istediğinizden emin misiniz?",
      }}
      close={() => setSelectedRow(null)} // Dialog kapatma fonksiyonu
      confirm={handleCancel} // Silme işlemini gerçekleştirme fonksiyonu
    />
  </>
}

const AppointmentItem = ({ item, next, prev, setRow }) => {
  const [stopScroll, setStopScroll] = useState(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => prev(),
    onSwipedRight: () => next(),
  });


  return <React.Fragment >
    <Grid item sx={{ userSelect: 'none', flex: 1, cursor: 'pointer' }} {...handlers} style={{ touchAction: stopScroll ? 'none' : 'auto' }}>
      <Box sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
        <AccessTimeIcon sx={{ fontSize: 15 }} />
        {item.saat}
        <Chip size="small" label="10 dakika kaldı" />
      </Box>
      <span> {item.title}</span>
    </Grid>
    <Grid item sx={{ width: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Tooltip title="Randevuyu iptal et">
        <IconButton sx={{ float: 'right' }} onClick={() => setRow(item)}>
          <CancelIcon />
        </IconButton>
      </Tooltip>
    </Grid>
  </React.Fragment>
}

export default AppointmentCaraousel;