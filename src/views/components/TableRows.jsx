import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import * as locales from '@mui/x-data-grid/locales';


const pageSizeOptions = [5, 10];


export default function TableRows({ columns, rows, checkboxSelection = false, page = 0, pageSize = 5 }) {

  const { i18n, t } = useTranslation();


  return (
    <Box sx={{ overflow: "auto" }}>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <DataGrid
          sx={{ p: 1 }}
          localeText={locales[`${i18n.language}${i18n.language?.toUpperCase()}`]?.components.MuiDataGrid.defaultProps.localeText}
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
      </Box>
    </Box>
  );
}