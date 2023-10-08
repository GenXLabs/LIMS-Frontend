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
import toast from 'react-hot-toast'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = () => {
  const [data, setData] = useState('')
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState('')

  useEffect(() => {
    apiDefinitions
      .getAllGlasswares()
      .then(res => {
        // Add an 'id' property to each row with a unique value
        const dataWithIds = res.data.map((row, index) => ({
          ...row,
          id: index + 1
        }))

        console.log(dataWithIds)
        setData(dataWithIds)
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
      inventory_name: '',
      availability: '',
      newly_arrivals: '',
      broken: '',
      return: '',
      balance: ''
    })

    // Validate the form fields
    // let hasErrors = false
    // const newErrors = { }

    // if (!editData.inventory_no) {
    //   newErrors.inventory_no = 'Inventory No is required'
    //   hasErrors = true
    // }

    // if (!editData.inventory_name) {
    //   newErrors.inventory_name = 'Inventory Name is required'
    //   hasErrors = true
    // }

    // if (isNaN(Number(editData.availability))) {
    //   newErrors.availability = 'Availability must be a number'
    //   hasErrors = true
    // }

    // if (isNaN(Number(editData.newly_arrivals))) {
    //   newErrors.newly_arrivals = 'Newly Arrivals must be a number'
    //   hasErrors = true
    // }

    // if (isNaN(Number(editData.broken))) {
    //   newErrors.broken = 'Broken must be a number'
    //   hasErrors = true
    // }

    // if (isNaN(Number(editData.return))) {
    //   newErrors.return = 'Return must be a number'
    //   hasErrors = true
    // }

    // if (isNaN(Number(editData.balance))) {
    //   newErrors.balance = 'Balance must be a number'
    //   hasErrors = true
    // }

    // // Display validation errors if there are any
    // if (hasErrors) {
    //   setValidationErrors(newErrors)

    //   return
    // }

    apiDefinitions.editGlasswares(editData.inventory_id, editData)
    .then(res => {
      console.log(res)
      toast.success('Successfully updated')

      // Update the corresponding row in the local state
      setData(prevData => {
        const updatedData = prevData.map(row => {
          if (row.inventory_id === editData.inventory_id) {
            // Update the row with the new data
            return {
              ...row,
              inventory_name: editData.inventory_name,
              availability: editData.availability,
              newly_arrivals: editData.newly,
              broken: editData.broken,
              returns: editData.return,
              balance: editData.balance,

            };
          }

          return row;
        });

        return updatedData;
      });
    })
    .catch(err => {
      console.log(err)
    })

    console.log('Edit data:', editData)
    handleEditClose()
  }

  const confirmDelete = id => {
    apiDefinitions
      .deleteGlasswares(id)
      .then(res => {
        console.log(res)
        toast.success('Successfully deleted')

        // Remove the deleted item from the data state
        setData(prevData => prevData.filter(item => item.inventory_id !== deleteItemId))
      })
      .catch(err => {
        console.log(err)
      })

    console.log(id)
    setDeleteConfirmationOpen(false)
  }

  const handleDelete = id => {
    setDeleteItemId(id)
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
              <IconButton color='error'>
                <Icon
                  icon='lucide:trash-2'
                  onClick={() => {
                    setDeleteConfirmationOpen(true)
                    handleDelete(params.row.inventory_id)
                  }}
                />
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
        return searchRegex.test(row[field]?.toString())
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
            {/* <Grid item xs={12}>
              <CustomTextField
                label='Inventory No'
                fullWidth
                value={editData.inventory_no || ''}
                onChange={e => setEditData({ ...editData, inventory_no: e.target.value })}
                required
                error={!!validationErrors.inventory_no}
                helperText={validationErrors.inventory_no}
              />
            </Grid> */}
            <Grid item xs={12}>
              <CustomTextField
                label='Inventory Name'
                fullWidth
                value={editData.inventory_name}
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
                value={editData.availability}
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
                value={editData.newly}
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
                value={editData.broken}
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
                value={editData.returns }
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
                value={editData.balance }
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
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant='body1'>Are you sure you want to delete this item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button
            color='primary'
            onClick={() => {
              confirmDelete(deleteItemId)
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableColumns
