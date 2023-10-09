// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from './QuickSearchToolbar'

// ** Data Import
// import { rows } from 'src/@fake-db/table/static-data'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material'

import Icon from 'src/@core/components/icon'

import apiDefinitions from 'src/api/apiDefinitions'
import toast from 'react-hot-toast'
import CustomTextField from 'src/@core/components/mui/text-field'

//10 mock data for below table
// const rows = [
//   {
//     id: 1,
//     venue: 'LAB-01',
//     date: '2021-10-01',
//     start_time: '08:00 AM',
//     end_time: '12:00 PM',
//     status: 1
//   },
//   {
//     id: 2,
//     venue: 'LAB-02',
//     date: '2021-10-02',
//     start_time: '08:00 AM',
//     end_time: '12:00 PM',
//     status: 2
//   },
//   {
//     id: 3,
//     venue: 'LAB-02',
//     date: '2021-10-03',
//     start_time: '08:00 AM',
//     end_time: '12:00 PM',
//     status: 3
//   },
//   {
//     id: 4,
//     venue: 'LAB-01',
//     date: '2021-10-04',
//     start_time: '08:00 AM',
//     end_time: '12:00 PM',
//     status: 3
//   },
//   {
//     id: 5,
//     venue: 'LAB-02',
//     date: '2021-10-05',
//     start_time: '08:00 AM',
//     end_time: '12:00 PM',
//     status: 4
//   }
// ]

const statusObj = {
  1: { title: 'Pending Admin Approval', color: 'warning' },
  2: { title: 'Approved', color: 'success' },
  3: { title: 'Completed', color: 'info' },
  4: { title: 'User Canceled', color: 'error' },
  5: { title: 'Admin Declined', color: 'error' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = () => {
  // ** Table data
  const [data, setData] = useState([])

  const [open, setOpen] = useState(false)

  const [editVenue, setEditVenue] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editStartTime, setEditStartTime] = useState('')
  const [editEndTime, setEditEndTime] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const [editDateError, setEditDateError] = useState(false)
  const [editStartTimeError, setEditStartTimeError] = useState(false)
  const [editEndTimeError, setEditEndTimeError] = useState(false)
  const [editDescriptionError, setEditDescriptionError] = useState(false)

  const [editDateErrorMessage, setEditDateErrorMessage] = useState('')
  const [editStartTimeErrorMessage, setEditStartTimeErrorMessage] = useState('')
  const [editEndTimeErrorMessage, setEditEndTimeErrorMessage] = useState('')
  const [editDescriptionErrorMessage, setEditDescriptionErrorMessage] = useState('')

  const [editReservationID, setEditReservationID] = useState('')

  const userData = JSON.parse(localStorage.getItem('userData'))

  const handleEditReservation = row => {
    console.log('Edit Reservation', row)

    setEditVenue(row.venue)
    setEditDate(row.date)
    setEditStartTime(row.start_time)
    setEditEndTime(row.end_time)
    setEditDescription(row.description)

    setEditReservationID(row.reservation_id)

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)

    setEditVenue('')
    setEditDate('')
    setEditStartTime('')
    setEditEndTime('')
    setEditDescription('')

    setEditDateError(false)
    setEditStartTimeError(false)
    setEditEndTimeError(false)
    setEditDescriptionError(false)

    setEditDateErrorMessage('')
    setEditStartTimeErrorMessage('')
    setEditEndTimeErrorMessage('')
    setEditDescriptionErrorMessage('')
  }

  const handleDeleteReservation = id => {
    console.log('Delete Reservation', id)

    apiDefinitions.updateReservationStatus(id, 4).then(res => {
      console.log(res)
      if (res.data.code == '200') {
        toast.success('Reservation Approved!')

        apiDefinitions.getAllLabReservations().then(res => {
          //add id to data
          res.data.data.forEach((item, index) => {
            item.id = index + 1
          })

          //add avatar if not available
          res.data.data.forEach(item => {
            if (!item.avatar) {
              item.avatar = ''
            }
          })
          setData(res.data.data)
          console.log(res.data.data)
        })
      } else {
        toast.error('Something went wrong!')
      }
    })
  }

  const saveEditedReservation = () => {
    console.log('Save Edited Reservation')

    let isValid = true

    if (editDate == '') {
      setEditDateError(true)
      setEditDateErrorMessage('Date is required')
      isValid = false
    }

    if (editStartTime == '') {
      setEditStartTimeError(true)
      setEditStartTimeErrorMessage('Start Time is required')
      isValid = false
    }

    if (editEndTime == '') {
      setEditEndTimeError(true)
      setEditEndTimeErrorMessage('End Time is required')
      isValid = false
    }

    if (editDescription == '') {
      setEditDescriptionError(true)
      setEditDescriptionErrorMessage('Description is required')
      isValid = false
    }

    if (isValid) {
      const reservation = {
        reservation_id: editReservationID,
        date: editDate,
        start_time: editStartTime,
        end_time: editEndTime,
        description: editDescription,
        updated_by: userData.id
      }

      console.log(reservation)

      apiDefinitions
        .updateReservation(reservation)
        .then(() => {
          toast.success('Reservation Updated!')

          apiDefinitions.getAllLabReservations().then(res => {
            //add id to data
            res.data.data.forEach((item, index) => {
              item.id = index + 1
            })

            //add avatar if not available
            res.data.data.forEach(item => {
              if (!item.avatar) {
                item.avatar = ''
              }
            })
            setData(res.data.data)
            console.log(res.data.data)
          })

          handleClose()
        })
        .catch(() => {
          toast.error('Something went wrong!')
        })
    }
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'id',
      headerName: 'ID',
      sortable: true,
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.id}
        </Typography>
      )
    },
    {
      flex: 0.1,
      type: 'venue',
      minWidth: 120,
      headerName: 'Venue',
      field: 'venue', // Add the 'field' property for sorting
      sortable: true, // Enable sorting
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.venue}
        </Typography>
      )
    },
    {
      flex: 0.15,
      type: 'date',
      minWidth: 120,
      headerName: 'Date',
      field: 'date',
      valueGetter: params => new Date(params.value),
      sortable: true,
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.date}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'start_time',
      headerName: 'Start Time',
      sortable: true,
      renderCell: params => {
        // Parse the time string (assuming it's in 24-hour format)
        const startTime = params.row.start_time
        const [hours, minutes] = startTime.split(':')
        const parsedHours = parseInt(hours, 10)
        const ampm = parsedHours >= 12 ? 'PM' : 'AM'
        const formattedHours = parsedHours % 12 || 12
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {formattedTime}
          </Typography>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'end_time',
      headerName: 'End Time',
      sortable: true,
      renderCell: params => {
        // Parse the time string (assuming it's in 24-hour format)
        const endTime = params.row.end_time
        const [hours, minutes] = endTime.split(':')
        const parsedHours = parseInt(hours, 10)
        const ampm = parsedHours >= 12 ? 'PM' : 'AM'
        const formattedHours = parsedHours % 12 || 12
        const formattedTime = `${formattedHours}:${minutes} ${ampm}`

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {formattedTime}
          </Typography>
        )
      }
    },
    {
      flex: 0.25,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      renderCell: params => {
        const status = statusObj[params.row.status]

        return (
          <CustomChip
            rounded
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'actions',
      headerName: 'Actions',
      sortable: false, // No sorting for this column
      filterable: false, // No filtering for this column
      renderCell: params => {
        return (
          <Box className='d-flex align-items-center'>
            <IconButton
              color='primary'
              disabled={params.row.status !== 1}
              onClick={() => handleEditReservation(params.row)}
            >
              <Icon icon='fluent:edit-16-regular' />
            </IconButton>
            <IconButton
              color='primary'
              disabled={params.row.status !== 1}
              onClick={() => handleDeleteReservation(params.row.reservation_id)}
            >
              <Icon icon='lucide:trash-2' />
            </IconButton>
          </Box>
        )
      }
    }
  ]

  useEffect(() => {
    apiDefinitions.getAllLabReservations().then(res => {
      if (res.data.data) {
        // Filter the data based on requester_id matching userData.id
        const filteredData = res.data.data.filter(item => item.requester_id === userData.id)

        // Assign a unique ID based on the index (you can adjust this logic as needed)
        const formattedData = filteredData.map((item, index) => ({
          ...item,
          id: index + 1
        }))

        setData(formattedData)
        console.log(formattedData)
      }
    })
  }, [userData.id]) // Make sure to include userData.id in the dependency array

  // ** States
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // Check if the field exists and is not null before calling toString()
        if (row[field] !== null) {
          return searchRegex.test(row[field].toString())
        }

        return false // Handle null or undefined values gracefully
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
      <Card>
        <CardHeader title='My Reservations' />
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
      </Card>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Reservation</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                id='outlined-basic'
                label='Venue'
                variant='outlined'
                value={editVenue}
                onChange={e => setEditVenue(e.target.value)}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                id='outlined-basic'
                type='date'
                label='Date'
                variant='outlined'
                value={editDate}
                error={editDateError}
                helperText={editDateErrorMessage}
                onChange={e => setEditDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                id='outlined-basic'
                type='time'
                label='Start Time'
                variant='outlined'
                value={editStartTime}
                error={editStartTimeError}
                helperText={editStartTimeErrorMessage}
                onChange={e => setEditStartTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                id='outlined-basic'
                type='time'
                label='End Time'
                variant='outlined'
                value={editEndTime}
                error={editEndTimeError}
                helperText={editEndTimeErrorMessage}
                onChange={e => setEditEndTime(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Description'
                fullWidth
                multiline
                rows={3}
                value={editDescription}
                error={editDescriptionError}
                helperText={editDescriptionErrorMessage}
                onChange={e => setEditDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button variant='contained' onClick={saveEditedReservation}>
            Save
          </Button>
          <Button onClick={handleClose} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableColumns
