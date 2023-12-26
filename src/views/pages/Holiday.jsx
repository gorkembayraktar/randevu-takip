
import Container from '@mui/material/Container';

import TableRows from '../components/TableRows';
import { Box, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material';


import { ozel_gunler } from '../../data/constant';
import dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tr'
import { useTitle } from '../../hooks/useTitle';

dayjs.locale(locale)

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

const Holiday = () =>{
  useTitle("Resmi Tatiller");

  return (
      <Box>
        
        <Typography color="red" fontFamily="revert"  variant="h5" component="h6">
          Resmi Tatiller
        </Typography>
        <TableRows rows={holidayRows} columns={holidayColumns} checkboxSelection={false} pageSize={10} />
      </Box>
  );
}


export default Holiday;