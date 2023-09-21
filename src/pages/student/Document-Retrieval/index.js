import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Icon from 'src/@core/components/icon';
import QuickSearchToolbar from './QuickSearchToolbar';

import Alert from '@mui/material/Alert'; // Import the Alert component

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

const rows = [
  {
    id: '1',
    module_name: 'Module 1',
  },
  {
    id: '2',
    module_name: 'Module 2',
  },
  {
    id: '3',
    module_name: 'Module 3',
  },
  {
    id: '4',
    module_name: 'Module 4',
  },
  {
    id: '5',
    module_name: 'Module 5',
  },
];

const columns = [
  {
    flex: 0.1,
    minWidth: 170,
    headerName: 'Name',
    field: 'module_name', // Use 'module_name' here to match your data
    renderCell: (params) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.value}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 170,
    field: 'actions',
    headerName: 'Actions',
    headerAlign: 'right',
    align: 'right',
    renderCell: (params) => {
      const [showDownloadAlert, setShowDownloadAlert] = useState(false);

      const toggleDownloadAlert = () => {
        setShowDownloadAlert(true);

        // Hide the alert after a delay (e.g., 3 seconds)
        setTimeout(() => {
          setShowDownloadAlert(false);
        }, 3000); // 3000 milliseconds = 3 seconds

        // Add your download logic here
        // You can trigger the actual download process here
      };

      return (
        <div className='d-flex align-items-center'>
          <Button
            variant='contained'
            endIcon={<Icon icon='material-symbols:Download' />}
            onClick={toggleDownloadAlert} // Call the function when the button is clicked
          >
            Download
          </Button>

          {/* Show the download alert when showDownloadAlert is true */}
          {showDownloadAlert && (
            <Alert severity='success'>Successfully Downloaded — check it out!</Alert>
          )}
        </div>
      );
    },
  },
];

const TableStickyHeaderColumns = () => {
  const [data] = useState(rows);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });

    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <Card>
      <CardHeader title='Document Retrieval' action={<Button variant='contained'>View Module</Button>} />
      <CardContent>
        <DataGrid
          autoHeight
          columns={columns}
          pageSizeOptions={[1, 2, 3, 4, 5]}
          paginationModel={paginationModel}
          rows={filteredData.length ? filteredData : data}
          onPaginationModelChange={setPaginationModel}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: '1.125rem',
            },
          }}
          slotProps={{
            baseButton: {
              size: 'medium',
              variant: 'outlined',
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: (event) => handleSearch(event.target.value),
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default TableStickyHeaderColumns;
