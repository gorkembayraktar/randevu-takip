
import Container from '@mui/material/Container';

import TableRows from '../components/TableRows';
import { Button, Chip, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';


const MEETING_STATUS = {
  1: "Onaylandı",
  2: "İptal Edildi",
  3: "Başka tarihe taşındı",
}

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'fullname', headerName: 'Adı Soyadı', width: 130 },
  { field: 'phone', headerName: 'Telefon', width: 130 },
  {
    field: 'statushandle',
    headerName: 'Durum',
    description: 'Randevunun durum bilgisi.',
    sortable: false,
    width: 160,

    renderCell: (params)  => <Chip size="small" label={MEETING_STATUS[params.row.status] || params.row.status} variant="outlined" color="success" />
             ,
  },
  {
    field: 'date',
    headerName: 'Randevu Tarih',
    width: 160,
    renderCell: (params) => <Tooltip title="1 gün önce">x eylül pazar </Tooltip>,
  },
  {
    field: "action",
    headerName: "Aksiyon",
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: ({ row }) =>
      <IconButton color="error" onClick={() => alert(JSON.stringify(row))}>
         <GridDeleteIcon />
      </IconButton>,
  },
 
];
/**
 * kolon işlemi yapmak için
 *  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
 */
const rows = [
  { id: 1, fullname: 'Ahmet Çağar', phone: '0535225555', date: new Date(), status: 1 },
];

for(let i = 0; i < 100; i++){
  rows.push({
    ...rows[0],
    id: i + 2
  });
}

const History = () =>{
  const mode = 'dark';


  return (
      <>
         <Container sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
            <Typography variant="h5" component="h6">
              Geçmiş Randevular
            </Typography>
            <Divider  sx={{my:3}}/>
            <Grid container spacing={2}>
                  <Grid item sm={8} sx={{ width:'100%' }}>

                  <TableRows rows={rows} columns={columns} pageSize={10} />

                  </Grid>
              </Grid> 
             
         </Container>
      </>
  );
}


export default History;