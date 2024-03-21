
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
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import CreateCustomer from '../components/modal/CreateCustomer';
import EditCustomer from '../components/modal/EditCustomer';

const MEETING_STATUS = {
  1: "Tamamlandı",
  2: "İptal Edildi",
}

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




const ROWS = [
  { id: 1, fullname: 'Ahmet Çağar', phone: '0535225555', note: 'asfkas fkas kfsak fask fksa kfask fkas kfask fksa kfask kfas kfak fkak f', created_at: new Date() },
];

const Customers = () => {



  useTitle("Müşteriler");

  const { success, alert } = useAlert();
  const [selectedRow, setSelectedRow] = useState(null);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openEditCustomer, setOpenEditCustomer] = useState(false);
  const [data, setData] = useState(ROWS);
  const handleDelete = () => {

    setData(
      data.filter(item => item.id !== selectedRow.id)
    );

    success('Müşteri başarılı şekilde silindi');
    setSelectedRow(null);

  };

  const addNewItem = (item) => {
    // başarılı olma durumunda listeye yeni öğe ekle

    setData(
      [
        item,
        ...data
      ]
    );
  }

  const updateItem = (updatedData) => {

    setData(
      data.map(item => {
        if (item.id === updatedData.id) {
          return {
            ...item,
            ...updatedData
          };
        }
        return item;
      })
    );
  }




  const columns = [

    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fullname', headerName: 'Adı Soyadı', flex: true },

    { field: 'phone', flex: true, headerName: 'Telefon', width: 150, valueGetter: (params) => new AsYouType('TR').input(params.row.phone) },
    { field: 'note', headerName: 'Not', flex: true },
    { field: 'created_at', headerName: 'Oluşturma tarih', width: 150, valueGetter: (params) => '1 ocak' },

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
            <IconButton color="info" onClick={() => {
              setSelectedRow(row);
              setOpenEditCustomer(true);
            }} >
              <EditSharpIcon />
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
            Müşteriler
          </Typography>
          <Button
            variant="outlined"
            tabIndex={-1}
            startIcon={<AddCircleSharpIcon />}
            onClick={() => setOpenCreateCustomer(true)}
          >
            Müşteri Oluştur
          </Button>

        </Stack>
      </Paper>

      <Grid container spacing={2}>
        <Grid item md={8} sx={{ width: '100%' }}>

          <TableRows rows={data} columns={columns} pageSize={10} />

        </Grid>
      </Grid>

      <DeleteDialog
        props={{
          open: selectedRow !== null && !openEditCustomer,
          title: "İşlem Onayı",
          content: "Bu kaydı silmek istediğinizden emin misiniz?",
        }}
        close={() => setSelectedRow(null)} // Dialog kapatma fonksiyonu
        confirm={handleDelete} // Silme işlemini gerçekleştirme fonksiyonu
      />
      <CreateCustomer
        open={openCreateCustomer}
        close={() => setOpenCreateCustomer(false)}
        onsuccess={addNewItem}
      />
      <EditCustomer
        open={openEditCustomer}
        close={() => (setOpenEditCustomer(false), setSelectedRow(null))}
        onsuccess={updateItem}
        data={selectedRow}
      />
    </>
  );
}


export default Customers;