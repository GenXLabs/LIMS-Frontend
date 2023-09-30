/* eslint-disable react/jsx-no-undef */
// ** React Imports
import { useEffect, useState } from 'react'

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

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import apiDefinitions from 'src/api/apiDefinitions'
import toast from 'react-hot-toast'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableStickyHeaderColumns = refreshTable2 => {
  const [editModalState, setEditModalState] = useState(false)

  const [editModuleCategory, setEditModuleCategory] = useState('')

  const [editModuleID, setEditModuleID] = useState('')

  const [refreshTable, setRefreshTable] = useState(false)

  const userData = JSON.parse(localStorage.getItem('userData'))
  console.log(userData.id)

  const handleEditModuleCat = () => {
    console.log('Edit Module Category', editModuleCategory)
    apiDefinitions
      .updateModuleCategory(editModuleID, { updated_by: userData.id, category_name: editModuleCategory })
      .then(() => {
        toast.success('Module Category Updated Successfully')
        setRefreshTable(!refreshTable)
        setEditModuleCategory('')
        setEditModalState(false)
      })
      .catch(err => {
        console.log('Error Updating Module Category', err)
        toast.error('Error Updating Module Category')
        setEditModuleCategory('')
        setEditModalState(false)
      })
  }

  const handleEditModalOpen = row => {
    setEditModalState(true)
    setEditModuleCategory(row.category_name)
    setEditModuleID(row.category_id)
  }

  const handleModuleCatCancel = () => {
    setEditModalState(false)
    setEditModuleCategory('')
  }

  const handleDeleteModuleCategory = row => {
    console.log('Delete Module Category', row.category_id)
    apiDefinitions
      .deleteModuleCategory(row.category_id, { deleted_by: userData.id })
      .then(() => {
        toast.success('Module Category Deleted Successfully')
        setRefreshTable(!refreshTable)
      })
      .catch(err => {
        console.log('Error Deleting Module Category', err)
        toast.error('Error Deleting Module Category')
      })
  }

  const columns = [
    {
      flex: 0.1,
      minWidth: 170,
      headerName: 'Module Code',
      field: 'category_id',
      headerAlign: 'center',
      align: 'center',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.category_id}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 170,
      headerName: 'Module Category',
      field: 'category_name',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.category_name}
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
            <IconButton color='error' onClick={() => handleDeleteModuleCategory(params.row)}>
              <Icon icon='lucide:trash-2' />
            </IconButton>
          </Box>
        )
      }
    }
  ]

  // ** States
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  useEffect(() => {
    apiDefinitions
      .getAllModuleCategories()
      .then(res => {
        const filteredData = res.data.data
          .filter(category => category.deleted_at === null)
          .map((category, index) => ({
            ...category,
            id: index + 1 // You can adjust the logic for generating the new ID as needed
          }))
        console.log('Module Categories', filteredData)
        setData(filteredData)
      })
      .catch(err => {
        console.log('Error getting module categories', err)
      })
  }, [refreshTable, refreshTable2])

  const handleSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')

    const filteredRows = data.filter(row => {
      // Check if category_name or category_id match the search criteria
      if (
        (row.category_name && searchRegex.test(row.category_name.toString())) ||
        (row.category_id && searchRegex.test(row.category_id.toString()))
      ) {
        return true
      }

      return false
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
