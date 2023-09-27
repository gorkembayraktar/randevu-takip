
import Container from '@mui/material/Container';

import TableRows from '../components/TableRows';
import { Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';


import { ozel_gunler } from '../../data/constant';
import dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tr'

dayjs.locale(locale)

const DATE_STATUS = {
    1: "Aktif",
    2: "Tamamlandı"
};

const DATE_STATUS_COLOR = {
    1: "success",
    2: "info"
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { 
    field: 'status', 
    headerName: 'Durum',
    width: 120, 
    renderCell: (params)  => <Chip 
                      label={DATE_STATUS[params.row.status] || params.row.status} variant="outlined" color={ DATE_STATUS_COLOR[params.row.status]} />
    },
  { 
    field: 'content', 
    headerName: 'Açıklama',   
    flex: 1, 
    width: 300, 
  },
  { 
    field: 'start', 
    headerName: 'Başlangıç Tarihi', 
    width: 170 ,
    
    valueGetter: (params) => dayjs(params.row.start).format('M MMMM dddd, YYYY')
  },
  { field: 'end', headerName: 'Bitiş Tarihi', width: 170,
  valueGetter: (params) => dayjs(params.row.end).format('M MMMM dddd, YYYY') },
  { 
    align:'center',
    field: 'total', 
    headerName: 'Toplam Gün', 
    valueGetter: (params) => dayjs(params.row.end).diff(params.row.start, 'day') + 1
  }
];


const currenDate = new Date();
const f = new Date();
f.setDate( currenDate.getDate() + 1 );
const rows = [
  { id: 1, content: 'izindeyiz', start: new Date(), end: f, status: 1 },
];

for(let i = 0; i < 100; i++){
  rows.push({
    ...rows[0],
    status: Math.random() > 0.5 ? 1 : 2,
    id: i + 2
  });
}


const holidayColumns =[
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Başlık',   flex: 1, width: 300},
    { field: 'start', headerName: 'Başlangıç Tarihi', width: 170,
    valueGetter: (params) => dayjs(params.row.start).format('M MMMM dddd, YYYY') },
    { field: 'end', headerName: 'Bitiş Tarihi', width: 170,
    valueGetter: (params) => dayjs(params.row.end).format('M MMMM dddd, YYYY') },
    { 
      align:'center',
      field: 'total', 
      headerName: 'Toplam Gün', 
      valueGetter: (params) => dayjs(params.row.end).diff(params.row.start, 'day') + 1
    }

];
const holidayRows = ozel_gunler.map((k,i) =>({...k, id: i + 1}));

const LimitDates = () =>{
  const mode = 'dark';


  return (
      <>
         <Container sx={{ pt:3 }}  style={{minHeight:"80vh"}} dark>
            <Typography variant="h5" component="h6">
              Kısıtlanan Tarihler
            </Typography>
            <TableRows rows={rows} columns={columns} />
            <Divider  sx={{my:3}}/>
            <Typography variant="h5" component="h6">
              Resmi Tatiller
            </Typography>
         
                  <TableRows rows={holidayRows} columns={holidayColumns} checkboxSelection={false} pageSize={10} />

         </Container>
      </>
  );
}


export default LimitDates;