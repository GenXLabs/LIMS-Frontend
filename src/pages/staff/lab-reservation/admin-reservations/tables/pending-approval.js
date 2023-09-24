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

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
// import { rows } from 'src/@fake-db/table/static-data'
import { Button, Grid } from '@mui/material'

import CustomTextField from 'src/@core/components/mui/text-field'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import Swal from 'sweetalert2'

import apiDefinitions from 'src/api/apiDefinitions'

import toast from 'react-hot-toast'

// ** renders client column
const renderClient = params => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]
  if (row.avatar.length) {
    return <CustomAvatar src={`/images/avatars/${row.avatar}`} sx={{ mr: 3, width: '1.875rem', height: '1.875rem' }} />
  } else {
    return (
      <CustomAvatar skin='light' color={color} sx={{ mr: 3, fontSize: '.8rem', width: '1.875rem', height: '1.875rem' }}>
        {getInitials(row.requester_full_name ? row.requester_full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj = {
  1: { title: 'Pending Approval', color: 'warning' },
  2: { title: 'Approved', color: 'success' },
  3: { title: 'Completed', color: 'info' },
  4: { title: 'User Canceled', color: 'error' },
  5: { title: 'Declined', color: 'error' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = () => {
  const [viewMoreOpen, setViewMoreOpen] = useState(false)
  const [viewMoreData, setViewMoreData] = useState([])

  const handleViewMoreOpen = () => {
    setViewMoreOpen(true)
  }

  const handleViewClose = () => {
    setViewMoreOpen(false)
  }

  const handleViewMore = data => {
    console.log('View More', data)
    setViewMoreData(data)
    handleViewMoreOpen()
  }

  const columns = [
    {
      flex: 0.15,
      minWidth: 180,
      field: 'full_name',
      headerName: 'Requested By',
      renderCell: params => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(params)}
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.requester_full_name}
              </Typography>
              <Typography noWrap variant='caption'>
                {row.requester_email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'batch',
      headerName: 'Batch',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.batch}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'venue',
      headerName: 'Venue',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.venue}
        </Typography>
      )
    },
    {
      flex: 0.1,
      type: 'date',
      minWidth: 120,
      headerName: 'Date',
      field: 'date',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.date}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'time',
      headerName: 'Time',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.start_time} - {params.row.end_time}
        </Typography>
      )
    },
    {
      flex: 0.2,
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
      sortable: false,
      filterable: false,
      renderCell: params => {
        return (
          <Grid container columnSpacing={5} rowSpacing={2} sx={{ mt: 2, mb: 2 }}>
            <Grid item>
              <Button variant='outlined' onClick={() => handleViewMore(params.row)}>
                View More
              </Button>
            </Grid>
          </Grid>
        )
      }
    }
  ]

  // ** States
  const [data, setData] = useState([])

  // ** Get data
  useEffect(() => {
    apiDefinitions.getAllLabReservations().then(res => {
      // Filter the data to include only items with status = 0
      const filteredData = res.data.data.filter(item => item.status === 1)

      // Add an 'id' to data
      filteredData.forEach((item, index) => {
        item.id = index + 1
      })

      // Add 'avatar' if not available
      filteredData.forEach(item => {
        if (!item.avatar) {
          item.avatar = ''
        }
      })

      setData(filteredData)
      console.log(filteredData)
    })
  }, [])

  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const handleRequestApprove = () => {
    console.log('approve')

    // Define the API endpoint for login
    const loginUrl = 'https://e-sms.dialog.lk/api/v1/login'

    // Define the API endpoint for sending approval SMS
    const apiUrl = 'https://e-sms.dialog.lk/api/v1/sms'

    // Define the login payload
    const loginPayload = {
      username: 'antpixelcore',
      password: 'Pixelcore@1133'
    }

    // Make a POST request to the login API
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginPayload)
    })
      .then(response => response.json())
      .then(loginData => {
        console.log(loginData)

        // Check if the login response contains a refresh token
        if (loginData.token) {
          console.log('Login Successful. Refresh Token:', loginData.token)

          // Create the SMS body for approval
          const approvalMessage = `Your reservation request for ${params.row.venue} has been approved.\nDate: ${params.row.date}\nTime: ${params.row.start_time} - ${params.row.end_time}`

          function generateRandomString(length) {
            const characters = '0123456789'
            let randomString = ''
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length)
              randomString += characters.charAt(randomIndex)
            }

            return randomString
          }

          // Generate a random transaction_id
          const transactionId = generateRandomString(8)

          // Create the payload for sending SMS
          const payload = {
            msisdn: [{ mobile: '767912651' }],
            sourceAddress: 'Pixelcore',
            message: approvalMessage,
            transaction_id: transactionId
          }

          // Make a POST request to send the approval SMS using the obtained refresh token
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loginData.token}`
            },
            body: JSON.stringify(payload)
          })
            .then(response => response.json())
            .then(smsData => {
              if (smsData.status) {
                console.log('Approval SMS Sent', smsData)
              } else {
                console.log('Approval SMS Not Sent', smsData)
              }
            })
            .catch(error => {
              console.error('Error:', error)
            })
        } else {
          console.log('Login failed. Refresh token not found in the response')
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleRequestDecline = () => {
    console.log('decline')

    // Define the API endpoint for login
    const loginUrl = 'https://e-sms.dialog.lk/api/v1/login'

    // Define the API endpoint for sending decline SMS
    const apiUrl = 'https://e-sms.dialog.lk/api/v1/sms'

    // Define the login payload
    const loginPayload = {
      username: 'antpixelcore',
      password: 'Pixelcore@1133'
    }

    // Make a POST request to the login API
    fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginPayload)
    })
      .then(response => response.json())
      .then(loginData => {
        console.log(loginData)

        // Check if the login response contains a refresh token
        if (loginData.token) {
          console.log('Login Successful. Refresh Token:', loginData.token)

          // Create the SMS body for decline
          const declineMessage = `Your reservation request for ${params.row.venue} has been declined.\nDate: ${params.row.date}\nTime: ${params.row.start_time} - ${params.row.end_time}`

          function generateRandomString(length) {
            const characters = '0123456789'
            let randomString = ''
            for (let i = 0; i < length; i++) {
              const randomIndex = Math.floor(Math.random() * characters.length)
              randomString += characters.charAt(randomIndex)
            }

            return randomString
          }

          // Generate a random transaction_id
          const transactionId = generateRandomString(8)

          // Create the payload for sending SMS
          const payload = {
            msisdn: [{ mobile: '767912651' }],
            sourceAddress: 'Pixelcore',
            message: declineMessage,
            transaction_id: transactionId
          }

          // Make a POST request to send the decline SMS using the obtained refresh token
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${loginData.token}`
            },
            body: JSON.stringify(payload)
          })
            .then(response => response.json())
            .then(smsData => {
              if (smsData.status) {
                console.log('Decline SMS Sent', smsData)
              } else {
                console.log('Decline SMS Not Sent', smsData)
              }
            })
            .catch(error => {
              console.error('Error:', error)
            })
        } else {
          console.log('Login failed. Refresh token not found in the response')
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <DataGrid
        autoHeight
        columns={columns}
        getRowHeight={() => 'auto'}
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
      <Dialog open={viewMoreOpen} onClose={handleViewClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'></DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container columnSpacing={6} rowSpacing={6}>
            <Grid item xs={6}>
              <CustomTextField
                id='name'
                fullWidth
                label='Requester Name'
                value={viewMoreData.requester_full_name ? viewMoreData.requester_full_name : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='batch'
                fullWidth
                label='Batch'
                value={viewMoreData.batch ? viewMoreData.batch : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='phone'
                fullWidth
                label='Requester Phone'
                value={viewMoreData.requester_phone ? viewMoreData.requester_phone : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='email'
                fullWidth
                label='Requester Email'
                value={viewMoreData.requester_email ? viewMoreData.requester_email : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='venue'
                fullWidth
                label='Venue'
                value={viewMoreData.venue ? viewMoreData.venue : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='date'
                fullWidth
                label='Date'
                value={viewMoreData.date ? viewMoreData.date : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='time'
                fullWidth
                label='Start Time'
                value={viewMoreData.start_time ? viewMoreData.start_time : ''}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                id='time'
                fullWidth
                label='End Time'
                value={viewMoreData.end_time ? viewMoreData.end_time : ''}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                id='description'
                fullWidth
                label='Description'
                value={viewMoreData.description ? viewMoreData.description : ''}
                multiline
                rows={3}
                disabled
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Grid container sx={{ padding: '22px' }}>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={5}>
                <Button
                  variant='contained'
                  color='success'
                  disabled={viewMoreData.status != 1 ? true : false}
                  onClick={handleRequestApprove}
                >
                  Approve
                </Button>
              </Grid>
              <Grid item xs={5}>
                <Button
                  variant='contained'
                  color='error'
                  disabled={viewMoreData.status != 1 ? true : false}
                  onClick={handleRequestDecline}
                >
                  Decline
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='contained' onClick={handleViewClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  )
}

export default TableColumns
