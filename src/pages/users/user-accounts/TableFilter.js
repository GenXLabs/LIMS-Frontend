// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import QuickSearchToolbar from './QuickSearchToolbar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
// import { rows } from 'src/@fake-db/table/static-data'

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

const statusObj = {
  student: { color: 'success' },
  admin: { color: 'warning' },
  staff: { color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const rows = [
  {
    id: '1',
    first_name: 'Dilshan',
    last_name: 'Fronando',
    email: 'dilshan@gmail.com',
    avatar: 'avatar-1.png',
    type: 'staff'
  },
  {
    id: '2',
    first_name: 'Avishka',
    last_name: 'Nuwan',
    email: 'avishka@gmail.com',
    avatar: 'avatar-1.png',
    type: 'admin'
  },
  {
    id: '3',
    first_name: 'Isum',
    last_name: 'Sandupa',
    email: 'isum@gmail.com',
    avatar: 'avatar-1.png',
    type: 'staff'
  },
  {
    id: '4',
    first_name: 'Kaveeja',
    last_name: 'Perera',
    email: 'kaveeja@gmail.com',
    avatar: 'avatar-1.png',
    type: 'student'
  },
  {
    id: '5',
    first_name: 'Sehana',
    last_name: 'Senanayaka',
    email: 'sehana@gmail.com',
    avatar: 'avatar-1.png',
    type: 'student'
  }
]

const columns = [
  {
    flex: 0.1,
    minWidth: 290,
    field: 'id',
    headerName: 'ID',
    renderCell: params => {
      const { row } = params

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(params)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
              {row.id}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 120,
    headerName: 'Name',
    field: 'name',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.first_name} {params.row.last_name}
      </Typography>
    )
  },

  {
    flex: 0.1,
    minWidth: 140,
    field: 'type',
    headerName: 'Type',
    renderCell: params => {
      const status = statusObj[params.row.type]

      return (
        <CustomChip
          rounded
          size='small'
          skin='light'
          color={status.color}
          label={params.row.type}
          sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
        />
      )
    }
  },

  {
    flex: 0.125,
    field: 'email',
    type: 'email',
    minWidth: 80,
    headerName: 'Email',
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.email}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'actions',
    headerName: 'Actions',
    renderCell: params => {
      return (
        <Box className='d-flex align-items-center'>
          <IconButton color='primary'>
            <Icon icon='fluent:edit-16-regular' />
          </IconButton>
          <IconButton color='primary'>
            <Icon icon='lucide:trash-2' />
          </IconButton>
        </Box>
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
  )
}

export default TableColumns
