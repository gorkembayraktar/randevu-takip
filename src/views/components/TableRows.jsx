import * as React from 'react';
import { DataGrid, GridToolbar, trTR } from '@mui/x-data-grid';


const pageSizeOptions = [5, 10];


export default function TableRows({ columns, rows, checkboxSelection = false, page = 0, pageSize = 5 }) {

  return (
    <DataGrid
      localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
      rowHeight={40}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page, pageSize },
        }
      }}
      pageSizeOptions={pageSizeOptions}
      checkboxSelection={checkboxSelection}
      slots={{ toolbar: GridToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
    />
  );
}