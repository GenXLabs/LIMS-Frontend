import React, { useState } from 'react'
import { Button, Grid } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import QuickSearchToolbar from './QuickSearchToolbar'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const inventoryData = [
  {
    id: '1',
    inventory_no: 'INV001',
    inventory_name: 'Inventory 1',
    serial_no: 'S001',
    date: '2023-10-04',
    time: '15:30',
    done_by: 'John Doe'
  },
  {
    id: '2',
    inventory_no: 'INV002',
    inventory_name: 'Inventory 1',
    serial_no: 'S001',
    date: '2023-10-04',
    time: '15:30',
    done_by: 'John Doe'
  }
]

const TableColumns = () => {
  const [data] = useState(inventoryData)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({})

  const [validationErrors, setValidationErrors] = useState({
    inventory_no: '',
    inventory_name: '',
    serial_no: '',
    date: '',
    time: '',
    done_by: ''
  })

  const handleEditOpen = row => {
    setEditData(row)
    setValidationErrors({
      inventory_no: '',
      inventory_name: '',
      serial_no: '',
      date: '',
      time: '',
      done_by: ''
    })
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditData({})
    setEditOpen(false)
  }

  const handleEditGlassware = () => {
    // Clear previous validation errors
    setValidationErrors({
      inventory_no: '',
      inventory_name: '',
      serial_no: '',
      date: '',
      time: '',
      done_by: ''
    })

    // Validate the form fields
    let hasErrors = false
    const newErrors = { ...validationErrors }

    if (!editData.inventory_no) {
      newErrors.inventory_no = 'Inventory No is required'
      hasErrors = true
    }

    if (!editData.inventory_name) {
      newErrors.inventory_name = 'Inventory Name is required'
      hasErrors = true
    }

    if (!editData.serial_no) {
      newErrors.serial_no = 'Serial No is required'
      hasErrors = true
    }

    if (!editData.date) {
      newErrors.date = 'Date is required'
      hasErrors = true
    }

    if (!editData.time) {
      newErrors.time = 'Time is required'
      hasErrors = true
    }

    if (!editData.done_by) {
      newErrors.done_by = 'Done By is required'
      hasErrors = true
    }

    // Display validation errors if there are any
    if (hasErrors) {
      setValidationErrors(newErrors)

      return
    }

    // Implement edit logic here
    console.log('Edit data:', editData)
    handleEditClose()
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Inventory No',
      field: 'inventory_no',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.inventory_no}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Instrument Name',
      field: 'inventory_name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.inventory_name}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Serial No',
      field: 'serial_no',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.serial_no}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Date',
      field: 'date',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.date}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Time',
      field: 'time',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.time}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Done By',
      field: 'done_by',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.done_by}
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
          <Grid container sx={{ display: 'flex', justifyContent: 'center' }} spacing={5}>
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
        )
      }
    }
  ]

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
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
        <DialogTitle id='form-dialog-title'>Edit Glassware details</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                label='Inventory No'
                fullWidth
                value={editData.inventory_no || ''}
                onChange={e => setEditData({ ...editData, inventory_no: e.target.value })}
                required
                error={!!validationErrors.inventory_no}
                helperText={validationErrors.inventory_no}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Instrument Name'
                fullWidth
                value={editData.inventory_name || ''}
                onChange={e => setEditData({ ...editData, inventory_name: e.target.value })}
                required
                error={!!validationErrors.inventory_name}
                helperText={validationErrors.inventory_name}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Serial No'
                fullWidth
                value={editData.serial_no || ''}
                onChange={e => setEditData({ ...editData, serial_no: e.target.value })}
                required
                error={!!validationErrors.serial_no}
                helperText={validationErrors.serial_no}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Date'
                fullWidth
                value={editData.date || ''}
                onChange={e => setEditData({ ...editData, date: e.target.value })}
                required
                error={!!validationErrors.date}
                helperText={validationErrors.date}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Time'
                fullWidth
                value={editData.time || ''}
                onChange={e => setEditData({ ...editData, time: e.target.value })}
                required
                error={!!validationErrors.time}
                helperText={validationErrors.time}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Done By'
                fullWidth
                value={editData.done_by || ''}
                onChange={e => setEditData({ ...editData, done_by: e.target.value })}
                required
                error={!!validationErrors.done_by}
                helperText={validationErrors.done_by}
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
  )
}

export default TableColumns
