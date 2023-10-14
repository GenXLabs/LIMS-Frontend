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
    modal_name: 'Modal 1',
    amount: '100'
  }

  // Add more data for other rows as needed
]

const TableColumns = () => {
  const [data] = useState(inventoryData)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({})

  const [validationErrors, setValidationErrors] = useState({
    modal_name: '',
    amount: ''
  })

  const handleEditOpen = row => {
    setEditData(row)
    setValidationErrors({
      modal_name: '',
      amount: ''
    })
    setEditOpen(true)
  }

  const handleEditClose = () => {
    setEditData({})
    setEditOpen(false)
  }

  const handleEditAnatomy = () => {
    // Clear previous validation errors
    setValidationErrors({
      modal_name: '',
      amount: ''
    })

    // Validate the form fields
    let hasErrors = false
    const newErrors = { ...validationErrors }

    if (!editData.modal_name) {
      newErrors.modal_name = 'Modal Name is required'
      hasErrors = true
    }

    if (isNaN(Number(editData.amount))) {
      newErrors.amount = 'Amount must be a number'
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
      flex: 0.5,
      minWidth: 150,
      headerName: 'Modal Name',
      field: 'modal_name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.modal_name}
        </Typography>
      )
    },
    {
      flex: 0.5,
      minWidth: 150,
      headerName: 'Amount',
      field: 'amount',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.amount}
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
        <DialogTitle id='form-dialog-title'>Edit Anatomy details</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                label='Modal Name'
                fullWidth
                value={editData.modal_name || ''}
                onChange={e => setEditData({ ...editData, modal_name: e.target.value })}
                required
                error={!!validationErrors.modal_name}
                helperText={validationErrors.modal_name}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Amount'
                fullWidth
                value={editData.amount || ''}
                onChange={e => setEditData({ ...editData, amount: e.target.value })}
                required
                type='number'
                error={!!validationErrors.amount}
                helperText={validationErrors.amount}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleEditAnatomy} variant='contained'>
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
