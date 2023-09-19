// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import QuickSearchToolbar from './QuickSearchToolbar'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const rows = [
  {
    id: '1',
    module_name: 'Module 1'
  },
  {
    id: '2',
    module_name: 'Module 2'
  },
  {
    id: '3',
    module_name: 'Module 3'
  },
  {
    id: '4',
    module_name: 'Module 4'
  },
  {
    id: '5',
    module_name: 'Module 5'
  }
]

const columns = [
  {
    flex: 0.1,
    minWidth: 170,
    headerName: 'Name',
    field: 'name',
    valueGetter: params => new Date(params.value),
    renderCell: params => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.module_name} {params.row.last_name}
      </Typography>
    )
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {
    flex: 0.1,
    minWidth: 170,
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

const TableStickyHeaderColumns = () => {
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

export default TableStickyHeaderColumns
