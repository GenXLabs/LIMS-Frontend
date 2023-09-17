// ** React Imports
import { useState } from 'react'

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
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const rows = [
  {
    id: 1,
    full_name: 'John Doe',
    avatar: '',
    email: 'john@example.com',
    batch: 'BSCS-3A',
    date: '2021-10-01',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 1
  },
  {
    id: 2,
    full_name: 'Jane Doe',
    avatar: '',
    email: 'jdoe@example.com',
    batch: 'BSCS-3A',
    date: '2021-10-02',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 2
  },
  {
    id: 3,
    full_name: 'George Bush',
    avatar: '',
    email: 'george@example.com',
    batch: 'BSCS-3A',
    date: '2021-10-03',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 3
  }
]

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

const columns = [
  {
    flex: 0.3,
    minWidth: 290,
    field: 'full_name',
    headerName: 'Requested By',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.full_name}
            </Typography>
            <Typography noWrap variant='caption'>
              {row.email}
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
    flex: 0.25,
    minWidth: 140,
    field: 'actions',
    headerName: 'Actions',
    renderCell: params => {
      return (
        <Grid container columnSpacing={5} rowSpacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid item>
            <Button variant='contained' color='success' disabled={params.row.status != 1 ? true : false}>
              Approve
            </Button>
          </Grid>

          <Grid item>
            <Button variant='contained' color='error' disabled={params.row.status != 1 ? true : false}>
              Decline
            </Button>
          </Grid>
        </Grid>
      )
    }
  }
]

const TableColumns = () => {
  // ** States
  const [data] = useState(rows)
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

  return (
    <Card>
      <CardHeader title='Reservation Requests' />
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
    </Card>
  )
}

export default TableColumns
