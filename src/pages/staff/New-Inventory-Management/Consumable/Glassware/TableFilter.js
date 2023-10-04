import React, { useEffect, useState } from 'react'
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
import apiDefinitions from 'src/api/apiDefinitions'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}


const TableColumns = () => {
  const [data,setData] = useState("")
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    apiDefinitions.getAllGlasswares()
    .then(res => {
      // Add an 'id' property to each row with a unique value
      const dataWithIds = res.data.map((row, index) => ({
        ...row,
        id: index + 1, 
      }));
      
      console.log(dataWithIds);
      setData(dataWithIds);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  useEffect(() => {}, [data])
  






  const [validationErrors, setValidationErrors] = useState({
    inventory_no: '',
    inventory_name: '',
    availability: '',
    newly_arrivals: '',
    broken: '',
    return: '',
    balance: ''
  })

  const handleEditOpen = row => {
    setEditData(row)
    setValidationErrors({
      inventory_no: '',
      inventory_name: '',
      availability: '',
      newly_arrivals: '',
      broken: '',
      return: '',
      balance: ''
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
      availability: '',
      newly_arrivals: '',
      broken: '',
      return: '',
      balance: ''
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

    if (isNaN(Number(editData.availability))) {
      newErrors.availability = 'Availability must be a number'
      hasErrors = true
    }

    if (isNaN(Number(editData.newly_arrivals))) {
      newErrors.newly_arrivals = 'Newly Arrivals must be a number'
      hasErrors = true
    }

    if (isNaN(Number(editData.broken))) {
      newErrors.broken = 'Broken must be a number'
      hasErrors = true
    }

    if (isNaN(Number(editData.return))) {
      newErrors.return = 'Return must be a number'
      hasErrors = true
    }

    if (isNaN(Number(editData.balance))) {
      newErrors.balance = 'Balance must be a number'
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
          {params.row.inventory_id}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: 'Inventory Name',
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
      headerName: 'Availability',
      field: 'availability',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.availability}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Newly Arrivals',
      field: 'newly_arrivals',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.newly}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Broken',
      field: 'broken',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.broken}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: 'Return',
      field: 'return',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.returns}
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
                label='Inventory Name'
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
                label='Availability'
                fullWidth
                value={editData.availability || ''}
                onChange={e => setEditData({ ...editData, availability: e.target.value })}
                required
                type='number'
                error={!!validationErrors.availability}
                helperText={validationErrors.availability}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Newly Arrivals'
                fullWidth
                value={editData.newly_arrivals || ''}
                onChange={e => setEditData({ ...editData, newly_arrivals: e.target.value })}
                required
                type='number'
                error={!!validationErrors.newly_arrivals}
                helperText={validationErrors.newly_arrivals}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Broken'
                fullWidth
                value={editData.broken || ''}
                onChange={e => setEditData({ ...editData, broken: e.target.value })}
                required
                type='number'
                error={!!validationErrors.broken}
                helperText={validationErrors.broken}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Return'
                fullWidth
                value={editData.return || ''}
                onChange={e => setEditData({ ...editData, return: e.target.value })}
                required
                type='number'
                error={!!validationErrors.return}
                helperText={validationErrors.return}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Balance'
                fullWidth
                value={editData.balance || ''}
                onChange={e => setEditData({ ...editData, balance: e.target.value })}
                required
                type='number'
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
  )
}

export default TableColumns
