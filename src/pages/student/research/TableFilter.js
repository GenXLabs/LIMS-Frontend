// ** React Imports
import { useEffect, useState } from 'react'

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
import apiDefinitions from 'src/api/apiDefinitions'

const statusObj = {
  1: { title: 'current', color: 'primary' },
  2: { title: 'professional', color: 'success' },
  3: { title: 'rejected', color: 'error' },
  4: { title: 'resigned', color: 'warning' },
  5: { title: 'applied', color: 'info' }
}

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = () => {
  // ** States
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  useEffect(() => {
    apiDefinitions
      .getAllResearch()
      .then(res => {
        //add id to data
        res.data.forEach((item, index) => {
          item.id = index + 1
        })

        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  const columns = [
    {
      flex: 1.5,
      minWidth: 150,
      headerName: 'Title',
      field: 'research_name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.research_name}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      headerName: 'Type of study',
      field: 'study_type',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.study_type}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 80,
      field: 'batch',
      headerName: 'Batch',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.batch}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'num_students',
      minWidth: 80,
      headerName: 'Students',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.num_students}
        </Typography>
      )
    },
    {
      flex: 1.5,
      field: 'assigned_assistant',
      minWidth: 130,
      headerName: 'Staff Name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.assigned_assistant}
        </Typography>
      )
    },
    {
      flex: 1,
      type: 'date',
      field: 'start_date',
      minWidth: 120,
      headerName: 'Start Date',
      valueGetter: params => new Date(params.value), // Convert 'startdate' to a date object
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.start_date).toLocaleDateString()} {/* Display the date in the desired format */}
        </Typography>
      )
    },
    {
      flex: 1,
      type: 'date',
      field: 'end_date',
      minWidth: 120,
      headerName: 'End Date',
      valueGetter: params => new Date(params.value), // Convert 'enddate' to a date object
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.end_date).toLocaleDateString()} {/* Display the date in the desired format */}
        </Typography>
      )
    }

    // {
    //   flex: 1,
    //   minWidth: 130,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: params => {
    //     // const status = statusObj[params.row.status]

    //     return (
    //       <CustomChip
    //         rounded
    //         size='small'
    //         skin='light'
    //         color='primary'
    //         label={params.row.status}
    //         sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
    //       />
    //     )
    //   }
    // }
  ]

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })

    setFilteredData(filteredRows)
  }

  return (
    <Card>
      <CardHeader title='Research Work' />
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
