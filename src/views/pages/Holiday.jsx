

import TableRows from '../components/TableRows';
import { Box, Button, ButtonGroup, IconButton, Paper, Stack, Tooltip, Typography } from '@mui/material';


import { ozel_gunler } from '../../data/constant';
import dayjs from 'dayjs';
import * as locale from 'dayjs/locale/tr'
import { useTitle } from '../../hooks/useTitle';

import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { GridDeleteIcon } from '@mui/x-data-grid';

import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteDialog from '../components/modal/DeleteDialog';
import { useState } from 'react';
import { useAlert } from '../../hooks/useAlert';
import CreateHoliday from '../components/modal/CreateHoliday';
import EditHoliday from '../components/modal/EditHoliday';
import UpdateDisabledSharpIcon from '@mui/icons-material/UpdateDisabledSharp';
import UpdateSharpIcon from '@mui/icons-material/UpdateSharp';

dayjs.locale(locale)

const holidayRows = ozel_gunler.map((k, i) => ({ ...k, id: i + 1, type: Math.random() > .5 ? 'tekrarla' : 'tek' }));

const holidayStatusProps = {
  tekrarla: {
    Icon: UpdateSharpIcon,
    color: 'success',
    hint: 'Her sene tekrarla'
  },
  tek: {
    Icon: UpdateDisabledSharpIcon,
    color: 'default',
    hint: 'Tek seferlik'
  }
};

const CustomIcon = ({ type }) => {

  if (!type || !holidayStatusProps[type])
    return null
  const { Icon, color, hint } = holidayStatusProps[type];


  return <Tooltip title={hint}>
    <Icon color={color} />
  </Tooltip>
}

const Holiday = () => {
  useTitle("Resmi Tatiller");


  const { success, alert } = useAlert();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDelete = () => {

    success('Başarılı şekilde silindi');
    setSelectedRow(null);
  };


  const holidayColumns = [
    {
      field: 'status',
      headerName: 'Durum',
      align: 'center',
      renderCell: (params) => <CustomIcon type={params.row.type} />
    },
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Başlık', flex: 1, width: 300 },

    {
      field: 'startend', headerName: 'Resmi Tatil', width: 170,
      valueGetter: (params) => dayjs(params.row.end).format('M MMMM') != dayjs(params.row.start).format('M MMMM') ? dayjs(params.row.end).format('M MMMM') + " - " + dayjs(params.row.end).format('M MMMM') : dayjs(params.row.end).format('M MMMM')
    },
    {
      align: 'center',
      field: 'total',
      headerName: 'Toplam Gün',
      valueGetter: (params) => dayjs(params.row.end).diff(params.row.start, 'day') + 1
    },
    {
      field: "action",
      headerName: "Aksiyon",
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: ({ row }) =>
        <ButtonGroup variant="outlined" aria-label="Aksiyon">
          <Tooltip title="Bu kaydı sil">
            <IconButton color="error" onClick={() => setSelectedRow(row)} >
              <GridDeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bu kaydı güncelle">
            <IconButton color="primary" onClick={() => {

              setOpenEditModal(true);
              setSelectedRow(row)
            }} >
              <EditSharpIcon />
            </IconButton>
          </Tooltip>

        </ButtonGroup>

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
            Resmi Tatiller
          </Typography>
          <Button
            variant="outlined"
            tabIndex={-1}
            startIcon={<AddCircleSharpIcon />}
            onClick={() => setOpenCreateModal(true)}
          >
            Oluştur
          </Button>
        </Stack>
      </Paper>
      <TableRows rows={holidayRows} columns={holidayColumns} checkboxSelection={false} pageSize={10} />
      <DeleteDialog
        props={{
          open: selectedRow !== null && !openEditModal,
          title: "İşlem Onayı",
          content: "Bu kaydı silmek istediğinizden emin misiniz?",
        }}
        close={() => setSelectedRow(null)} // Dialog kapatma fonksiyonu
        confirm={handleDelete} // Silme işlemini gerçekleştirme fonksiyonu
      />
      <CreateHoliday open={openCreateModal} close={() => setOpenCreateModal(false)} />


      <EditHoliday
        open={openEditModal}
        close={() => {
          setSelectedRow(null);
          setOpenEditModal(false);
        }}
        data={selectedRow}
      />

    </Box>
  );
}


export default Holiday;