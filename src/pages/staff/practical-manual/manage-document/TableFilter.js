// ** React Imports
import { useState, useEffect } from 'react'
import { Button, Grid, MenuItem } from '@mui/material'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { DataGrid } from '@mui/x-data-grid'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'

// ** Custom Components
import QuickSearchToolbar from './QuickSearchToolbar'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

import CustomTextField from 'src/@core/components/mui/text-field'
import apiDefinitions from 'src/api/apiDefinitions'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = () => {
  // ** States
  const [data] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [editOpen, setEditOpen] = useState(false)

  const [moduleCategories, setModuleCategories] = useState([])

  const handleEditOpen = row => {
    setEditOpen(true)
    setEditTitle(row.title)
    setEditDescription(row.description)
    console.log(editOpen)
  }

  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const handleEditClose = () => {
    setEditOpen(false)
    setEditTitle('')
    setEditDescription('')
  }

  useEffect(() => {
    apiDefinitions
      .getAllModuleCategories()
      .then(res => {
        // Filter out records where "deleted_at" is not null
        const filteredData = res.data.data.filter(category => category.deleted_at === null)
        console.log(filteredData)
        setModuleCategories(filteredData)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    apiDefinitions
      .getAllPracticalManuals()
      .then(res => {
        // Filter out records where "deleted_at" is not null
        const filteredData = res.data.data.filter(manual => manual.deleted_at === null)

        // Add an "id" field to each record
        const dataWithId = filteredData.map((record, index) => ({
          ...record,
          id: index + 1 // You can replace this with the desired value for "id"
        }))

        console.log(dataWithId)
        setFilteredData(dataWithId)
      })
      .catch(err => console.log(err))
  }, [])

  const handleEditInstrument = () => {
    const editInstrumentPayload = [
      {
        title: editTitle,
        description: editDescription
      }
    ]
    console.log(editInstrumentPayload)
    handleEditClose()
  }

  const moduleCategoryMapping = {}
  moduleCategories.forEach(category => {
    moduleCategoryMapping[category.category_id] = category.category_name
  })

  const columns = [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'title',
      headerName: 'Title',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon='uiw:file-pdf' />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
              <Typography
                noWrap
                variant='body2'
                sx={{
                  color: 'text.primary',
                  whiteSpace: 'pre-line',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxHeight: '3em',
                  lineHeight: '1.5em'
                }}
              >
                {params.row.title}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: (
        <Typography
          variant='body2'
          sx={{
            color: 'text.primary',
            whiteSpace: 'pre-line',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            lineHeight: '1.5em'
          }}
        >
          Module Category
        </Typography>
      ),
      field: 'module_category',
      renderCell: params => (
        <Typography
          variant='body2'
          sx={{
            color: 'text.primary',
            whiteSpace: 'pre-line',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            lineHeight: '1.5em'
          }}
        >
          {moduleCategoryMapping[params.row.module_category]}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      headerName: 'Description',
      field: 'description',

      renderCell: params => (
        <Typography
          variant='body2'
          sx={{
            color: 'text.primary',
            whiteSpace: 'pre-line',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            lineHeight: '1.5em'
          }}
        >
          {params.row.description}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Uploaded By',
      field: 'uploaded_by',
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.uploaded_by}
        </Typography>
      )
    },
    {
      flex: 0.1,
      type: 'date',
      minWidth: 100,
      headerName: (
        <Typography
          variant='body2'
          sx={{
            color: 'text.primary',
            whiteSpace: 'pre-line',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: '3em',
            lineHeight: '1.5em'
          }}
        >
          Uploaded Date
        </Typography>
      ),
      field: 'uploaded_date',
      valueGetter: params => new Date(params.value), // Converts the number to a Date object
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {new Date(params.row.created_at).toLocaleDateString()} {/* Adjust the formatting as needed */}
        </Typography>
      )
    },

    {
      flex: 0.2,
      minWidth: 250,
      field: 'actions',
      sortable: false,
      filterable: false,
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
                <Icon icon='lucide:trash-2' />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='success'>
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
        <DialogTitle id='form-dialog-title'>Edit Practical Manual</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField label='Title' fullWidth value={editTitle} onChange={e => setEditTitle(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField select defaultValue='' label='Module Category' id='custom-select' fullWidth>
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {moduleCategories.map(category => (
                  <MenuItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Description'
                fullWidth
                multiline
                rows={3}
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleEditInstrument} variant='contained'>
            Update
          </Button>
          <Button onClick={handleEditClose} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableColumns
