/* eslint-disable react/jsx-no-undef */
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

// ** MUI Imports
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'

import Swal from 'sweetalert2'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableStickyHeaderColumns = () => {
  const [editModalState, setEditModalState] = useState(false)

  const [editModuleCategory, setEditModuleCategory] = useState('')

  const handleEditModuleCat = () => {
    console.log('Edit Module Category', editModuleCategory)
    setEditModuleCategory('')
    setEditModalState(false)
  }

  const handleEditModalOpen = row => {
    setEditModalState(true)
    setEditModuleCategory(row.module_name)
  }

  const handleModuleCatCancel = () => {
    setEditModalState(false)
    setEditModuleCategory('')
  }

  const rows = [
    {
      id: '1',
      module_code: 1,
      module_name: 'Module 1'
    },
    {
      id: '2',
      module_code: 2,
      module_name: 'Module 2'
    },
    {
      id: '3',
      module_code: 3,
      module_name: 'Module 3'
    },
    {
      id: '4',
      module_code: 4,
      module_name: 'Module 4'
    },
    {
      id: '5',
      module_code: 5,
      module_name: 'Module 5'
    }
  ]

  const columns = [
    {
      flex: 0.1,
      minWidth: 170,
      headerName: 'Module Code',
      field: 'module_code',
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.module_code}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 170,
      headerName: 'Module Name',
      field: 'module_name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.module_name}
        </Typography>
      )
    },

    {
      flex: 0.15,
      minWidth: 170,
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'right',
      align: 'right',
      sortable: false,
      filterable: false,
      renderCell: params => {
        return (
          <Box className='d-flex align-items-center'>
            <IconButton color='primary' onClick={() => handleEditModalOpen(params.row)}>
              <Icon icon='fluent:edit-16-regular' />
            </IconButton>
            <IconButton color='error'>
              <Icon icon='lucide:trash-2' />
            </IconButton>
          </Box>
        )
      }
    }
  ]

  // ** States
  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 })

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
    <div>
      <DataGrid
        autoHeight
        columns={columns}
        pageSizeOptions={[1, 2, 3, 4, 5]}
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
      <Dialog open={editModalState} onClose={handleModuleCatCancel} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit Module Category</DialogTitle>
        <DialogContent sx={{ minWidth: '500px' }}>
          <CustomTextField
            id='moduleCategory'
            fullWidth
            type='text'
            label='Module Category Name'
            value={editModuleCategory}
            onChange={e => setEditModuleCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleEditModuleCat} variant='contained'>
            Edit
          </Button>
          <Button onClick={handleModuleCatCancel} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TableStickyHeaderColumns
