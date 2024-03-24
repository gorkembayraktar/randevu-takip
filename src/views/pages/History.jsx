
import Container from '@mui/material/Container';

import TableRows from '../components/TableRows';
import { Button, ButtonGroup, Chip, Divider, Grid, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { useTitle } from '../../hooks/useTitle';
import { AsYouType } from 'libphonenumber-js'
import dayjs from 'dayjs';
import DoneSharpIcon from '@mui/icons-material/DoneSharp';
import BlockSharpIcon from '@mui/icons-material/BlockSharp';
import { useState } from 'react';
import { useAlert } from '../../hooks/useAlert';
import DeleteDialog from '../components/modal/DeleteDialog';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { useTranslation } from 'react-i18next';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime)



const meetingStatus = {
  1: {
    Icon: DoneSharpIcon,
    color: 'success',
    hint: 'Tamamlandı'
  },
  2: {
    Icon: BlockSharpIcon,
    color: 'default',
    hint: 'İptal edildi'
  }
};

const CustomIcon = ({ status }) => {

  if (!status || !meetingStatus[status])
    return null
  const { Icon, color, hint } = meetingStatus[status];


  return <Tooltip title={hint}>
    <Icon color={color} />
  </Tooltip>
}


const rows = [
  { id: 1, fullname: 'Ahmet Çağar', phone: '0535225555', date: new Date(), status: 1 },
];

for (let i = 0; i < 100; i++) {
  rows.push({
    ...rows[0],
    id: i + 2,
    status: Math.random() > 0.5 ? 1 : 2
  });
}

const History = () => {

  const { t } = useTranslation();

  useTitle(
    t('Appointments Processed')
  );
  const { success, alert } = useAlert();
  const [selectedRow, setSelectedRow] = useState(null);
  const handleDelete = () => {

    success(t('history.Successfully deleted'));
    setSelectedRow(null);
  };


  const columns = [
    {
      field: 'status',
      headerName: t('history.column.status'),
      align: 'center',
      renderCell: (params) => <CustomIcon status={params.row.status} />
    },
    { field: 'id', headerName: t('history.column.id'), width: 70 },
    { field: 'fullname', headerName: t('history.column.fullname'), minWidth: 120, flex: true },

    { field: 'phone', flex: true, headerName: t('history.column.phone'), minWidth: 120, valueGetter: (params) => new AsYouType('TR').input(params.row.phone) },
    { field: 'created_at', headerName: t('history.column.created_at'), minWidth: 150, valueGetter: (params) => '1 ocak' },
    {
      field: 'date',
      headerName: t('history.column.date'),
      minWidth: 160,
      renderCell: (params) => <Tooltip title={dayjs(params.row.start).fromNow()}>{dayjs(params.row.start).format('M MMMM YYYY')}</Tooltip>,
    },
    {
      field: "action",
      headerName: t('history.column.action'),
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: ({ row }) =>
        <ButtonGroup variant="outlined" aria-label={t('history.column.action')}>
          <Tooltip title={t('history.btn_delete')}>
            <IconButton color="error" onClick={() => setSelectedRow(row)} >
              <GridDeleteIcon />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
    },

  ];

  return (
    <>
      <Paper elevation={2} sx={{ py: 1, px: 2, mb: 2, }}>
        <Stack
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >

          <Typography fontFamily="revert" fontWeight="bold">
            {t('Appointments Processed')}
          </Typography>

        </Stack>
      </Paper>

      <Grid container spacing={2}>
        <Grid item sx={{ width: '100%' }}>

          <TableRows rows={rows} columns={columns} pageSize={10} />

        </Grid>
      </Grid>

      <DeleteDialog
        props={{
          open: selectedRow !== null,
          title: t('dialog.delete.title'),
          content: t('dialog.delete.content'),
        }}
        close={() => setSelectedRow(null)} // Dialog kapatma fonksiyonu
        confirm={handleDelete} // Silme işlemini gerçekleştirme fonksiyonu
      />
    </>
  );
}


export default History;