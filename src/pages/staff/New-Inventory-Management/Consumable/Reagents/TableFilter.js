import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import Icon from 'src/@core/components/icon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CustomTextField from 'src/@core/components/mui/text-field';
import QuickSearchToolbar from './QuickSearchToolbar';

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const inventoryData = [
  {
    id: '1',
    chemical_name: 'Chemical 1',
    type: 'Type A',
    MSDs_location: 'Location X',
    hazard_class: 'Class 1',
    maximum_quantity: '10',
    balance: '3',
  },
  // Add more data for other rows as needed
];

const TableColumns = () => {
  const [data] = useState(inventoryData);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 });
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [validationErrors, setValidationErrors] = useState({
    chemical_name: '',
    type: '',
    MSDs_location: '',
    hazard_class: '',
    maximum_quantity: '',
    balance: '',
  });

  const handleEditOpen = row => {
    setEditData(row);
    setValidationErrors({
      chemical_name: '',
      type: '',
      MSDs_location: '',
      hazard_class: '',
      maximum_quantity: '',
      balance: '',
    });
    setEditOpen(true);
  }

  const handleEditClose = () => {
    setEditData({});
    setEditOpen(false);
  }

  const handleEditGlassware = () => {
    setValidationErrors({
      chemical_name: '',
      type: '',
      MSDs_location: '',
      hazard_class: '',
      maximum_quantity: '',
      balance: '',
    });

    let hasErrors = false;
    const newErrors = { ...validationErrors };

    if (!editData.chemical_name) {
      newErrors.chemical_name = 'Chemical Name is required';
      hasErrors = true;
    }

    if (!editData.type) {
      newErrors.type = 'Type is required';
      hasErrors = true;
    }

    if (!editData.MSDs_location) {
      newErrors.MSDs_location = 'MSDs location is required';
      hasErrors = true;
    }

    if (!editData.hazard_class) {
      newErrors.hazard_class = 'Hazard class is required';
      hasErrors = true;
    }

    if (isNaN(Number(editData.maximum_quantity))) {
      newErrors.maximum_quantity = 'Maximum quantity must be a number';
      hasErrors = true;
    }

    if (isNaN(Number(editData.balance))) {
      newErrors.balance = 'Balance must be a number';
      hasErrors = true;
    }

    if (hasErrors) {
      setValidationErrors(newErrors);
      return;
    }

    console.log('Edit data:', editData);
    handleEditClose();
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Chemical Name',
      field: 'chemical_name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.chemical_name}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Type',
      field: 'type',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.type}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      headerName: 'MSDs Location',
      field: 'MSDs_location',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.MSDs_location}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Hazard Class',
      field: 'hazard_class',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.hazard_class}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 150,
      headerName: 'Maximum Quantity',
      field: 'maximum_quantity',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.maximum_quantity}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Balance',
      field: 'balance',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.balance}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      align: 'center',
      renderCell: params => {
        return (
          <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={2}>
            <Grid item>
              <IconButton color='primary' onClick={() => handleEditOpen(params.row)}>
                <Icon icon='fluent:edit-16-regular' />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='error' onClick={() => handleDelete(params.row)}>
                <Icon icon='lucide:trash-2' />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='success' onClick={() => handleDownload(params.row)}>
                <Icon icon='material-symbols:download' />
              </IconButton>
            </Grid>
          </Grid>
        );
      }
    }
  ];

  const handleSearch = searchValue => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString());
      });
    });
    if (searchValue.length) {
      setFilteredData(filteredRows);
    } else {
      setFilteredData([]);
    }
  }

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[7, 10, 25, 50]}
        paginationModel={paginationModel}
        slots={{ toolbar: QuickSearchToolbar }}
        onPaginationModelChange={setPaginationModel}
        rows={filteredData.length ? filteredData : data}
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: '1.125rem'
          }
        }}
        slotProps={{
          baseButton: {
            size: 'medium',
            variant: 'outlined'
          },
          toolbar: {
            value: searchText,
            clearSearch: () => handleSearch(''),
            onChange: event => handleSearch(event.target.value)
          }
        }}
      />
      <Dialog open={editOpen} onClose={handleEditClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Inventory Details</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                label='Chemical Name'
                fullWidth
                value={editData.chemical_name || ''}
                onChange={e => setEditData({ ...editData, chemical_name: e.target.value })}
                required
                error={!!validationErrors.chemical_name}
                helperText={validationErrors.chemical_name}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Type'
                fullWidth
                value={editData.type || ''}
                onChange={e => setEditData({ ...editData, type: e.target.value })}
                required
                error={!!validationErrors.type}
                helperText={validationErrors.type}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='MSDs Location'
                fullWidth
                value={editData.MSDs_location || ''}
                onChange={e => setEditData({ ...editData, MSDs_location: e.target.value })}
                required
                error={!!validationErrors.MSDs_location}
                helperText={validationErrors.MSDs_location}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Hazard Class'
                fullWidth
                value={editData.hazard_class || ''}
                onChange={e => setEditData({ ...editData, hazard_class: e.target.value })}
                required
                error={!!validationErrors.hazard_class}
                helperText={validationErrors.hazard_class}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Maximum Quantity'
                fullWidth
                value={editData.maximum_quantity || ''}
                onChange={e => setEditData({ ...editData, maximum_quantity: e.target.value })}
                required
                type="number"
                error={!!validationErrors.maximum_quantity}
                helperText={validationErrors.maximum_quantity}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Balance'
                fullWidth
                value={editData.balance || ''}
                onChange={e => setEditData({ ...editData, balance: e.target.value })}
                required
                type="number"
                error={!!validationErrors.balance}
                helperText={validationErrors.balance}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleEditGlassware} variant='contained'>
            Update
          </Button>
          <Button onClick={handleEditClose} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TableColumns;
