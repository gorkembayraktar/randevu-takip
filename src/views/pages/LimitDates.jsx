

import TableRows from '../components/TableRows';
import { Box, Button, Chip, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';

import DoneAllSharpIcon from '@mui/icons-material/DoneAllSharp';
import HourglassEmptySharpIcon from '@mui/icons-material/HourglassEmptySharp';

import dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tr'
import { useTitle } from '../../hooks/useTitle';
import { GridDeleteIcon } from '@mui/x-data-grid';

import HourglassBottomSharpIcon from '@mui/icons-material/HourglassBottomSharp';

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import DeleteDialog from '../components/modal/DeleteDialog';
import { useState } from 'react';
import CreateLimitDate from '../components/modal/CreateLimitDate';
import { useAlert } from '../../hooks/useAlert';
import { useTranslation } from 'react-i18next';



const limitDatesStatusProps = {
  aktif: {
    Icon: HourglassBottomSharpIcon,
    color: 'primary',
    hint: 'Devam ediyor.'
  },
  bekleniyor: {
    Icon: HourglassEmptySharpIcon,
    color: 'primary',
    hint: 'Bekleniyor.'
  },
  tamamlandi: {
    Icon: DoneAllSharpIcon,
    color: 'success',
    hint: 'Tamamlandı'
  }
};

const CustomIcon = ({ status }) => {

  const { Icon, color, hint } = limitDatesStatusProps[status];

  return <Tooltip title={hint}>
    <Icon color={color} />
  </Tooltip>
}



const currenDate = new Date();
const f = new Date();
f.setDate(currenDate.getDate() + 3);
const rows = [
  { id: 1, content: 'izindeyiz', start: new Date(), end: f, status: 'tamamlandi' },
];

for (let i = 0; i < 100; i++) {
  rows.push({
    ...rows[0],
    status: Math.random() > 0.5 ? 'tamamlandi' : 'aktif',
    id: i + 2
  });
}


const LimitDates = () => {

  const { t, i18n } = useTranslation();

  useTitle(
    t('limit_date.Off Dates')
  );

  const { success, alert } = useAlert();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = () => {
    success('Başarılı şekilde silindi');
    setSelectedRow(null);
  };


  dayjs.locale(i18n.language)

  const columns = [
    {
      field: 'status',
      headerName: t('limit_date.column.status'),
      align: 'center',
      renderCell: (params) => <CustomIcon status={params.row.status} />
    },
    { field: 'id', headerName: t('limit_date.column.id'), minWidth: 70 },
    { field: 'user', headerName: t('limit_date.column.user'), minWidth: 100, valueGetter: (params) => 'test' },

    {
      field: 'content',
      headerName: t('limit_date.column.explain'),
      flex: 1,
      minWidth: 100,
    },
    {
      field: 'created_at',
      headerName: t('limit_date.column.created_at'),
      minWidth: 100,

      valueGetter: (params) => dayjs(params.row.start).format('M MMMM YYYY, H:mm')
    },
    {
      field: 'start',
      headerName: t('limit_date.column.start_date'),
      width: 170,

      valueGetter: (params) => dayjs(params.row.start).format('M MMMM YYYY, H:mm')
    },
    {
      field: 'end', headerName: t('limit_date.column.end_date'), width: 170,
      valueGetter: (params) => dayjs(params.row.end).format('M MMMM YYYY, H:mm')
    },
    {
      align: 'center',
      field: 'total',
      headerName: t('limit_date.column.total'),
      renderCell: ({ row }) => <Chip label={dayjs(row.end).diff(row.start, 'day')} size='small' />
      // valueGetter: (params) => dayjs(params.row.end).diff(params.row.start, 'day') + 1
    },
    {
      field: "action",
      headerName: t('limit_date.column.action'),
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: ({ row }) =>
        <Tooltip title={t('limit_date.btn_delete')}>
          <IconButton color="error" onClick={() => setSelectedRow(row)}>
            <GridDeleteIcon />
          </IconButton>
        </Tooltip>
    },
  ];

  return (
    <Box>

      <Paper elevation={2} sx={{ py: 1, px: 2, mb: 2, }}>
        <Stack
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >

          <Typography fontFamily="revert" fontWeight="bold">
            {t('limit_date.Off Dates')}
          </Typography>
          <Button
            variant="outlined"
            tabIndex={-1}
            startIcon={<AddCircleSharpIcon />}
            onClick={() => setOpenCreateModal(true)}
          >
            {t('limit_date.btn_create')}
          </Button>
        </Stack>
      </Paper>
      <TableRows rows={rows} columns={columns} pageSize={10} />


      <DeleteDialog
        props={{
          open: selectedRow !== null,
          title: t('dialog.delete.title'),
          content: t('dialog.delete.content'),
        }}
        close={() => setSelectedRow(null)} // Dialog kapatma fonksiyonu
        confirm={handleDelete} // Silme işlemini gerçekleştirme fonksiyonu
      />

      <CreateLimitDate open={openCreateModal} close={() => setOpenCreateModal(false)} />

    </Box >
  );
}


export default LimitDates;