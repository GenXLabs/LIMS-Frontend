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

// ** Data Import
// import { rows } from 'src/@fake-db/table/static-data'
import { IconButton } from '@mui/material'

import Icon from 'src/@core/components/icon'

//10 mock data for below table
const rows = [
  {
    id: 1,
    venue: 'LAB-01',
    date: '2021-10-01',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 1
  },
  {
    id: 2,
    venue: 'LAB-02',
    date: '2021-10-02',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 2
  },
  {
    id: 3,
    venue: 'LAB-02',
    date: '2021-10-03',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 3
  },
  {
    id: 4,
    venue: 'LAB-01',
    date: '2021-10-04',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 3
  },
  {
    id: 5,
    venue: 'LAB-02',
    date: '2021-10-05',
    start_time: '08:00 AM',
    end_time: '12:00 PM',
    status: 4
  }
]

const statusObj = {
  1: { title: 'Pending Admin Approval', color: 'warning' },
  2: { title: 'Approved', color: 'success' },
  3: { title: 'Completed', color: 'info' },
  4: { title: 'User Canceled', color: 'error' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const columns = [
  {
    flex: 0.2,
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
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.start_time}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 110,
    field: 'end_time',
    headerName: 'End Time',
    sortable: true,
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.end_time}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 140,
    field: 'status',
    headerName: 'Status',
    sortable: false,
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
    renderCell: params => {
      return (
        <Box className='d-flex align-items-center'>
          <IconButton color='primary' disabled={params.row.status !== 1}>
            <Icon icon='fluent:edit-16-regular' />
          </IconButton>
          <IconButton color='primary' disabled={params.row.status !== 1}>
            <Icon icon='lucide:trash-2' />
          </IconButton>
        </Box>
      )
    }
  }
]

const TableColumns = () => {
  // ** Table data
  const [data] = useState(rows)

  // ** States
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      // Check if the search value matches the "Status" title
      const statusTitle = statusObj[row.status].title.toLowerCase()
      if (statusTitle.includes(searchValue.toLowerCase())) {
        return true
      }

      // Check if the search value matches any other field
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
  )
}

export default TableColumns
