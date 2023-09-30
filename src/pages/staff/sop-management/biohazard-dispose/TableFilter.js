// ** React Imports
import { useState,useEffect } from 'react'
import { Button, Grid } from '@mui/material'

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

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

// const rows = [

//   {
//     id: '1',
//     title: 'PDF1',
//     uploaded_by: 'ishum',
//     uploaded_date: '02/01/2022',
//     description: 'About the bio'
//   },
//   {
//     id: '2',
//     title: 'PDF2',
//     uploaded_by: 'sampath',
//     uploaded_date: '04/11/2022',
//     description: 'About the bio'
//   },
//   {
//     id: '3',
//     title: 'PDF3',
//     uploaded_by: 'samantha',
//     uploaded_date: '22/01/2023',
//     description: 'About the bio'
//   },
//   {
//     id: '4',
//     title: 'PDF4',
//     uploaded_by: 'kamal',
//     uploaded_date: '22/12/2023',
//     description: 'About the bio'
//   }
// ]

useEffect


const TableColumns = () => {
  // ** States
  const [data] = useState(rows)
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [editOpen, setEditOpen] = useState(false)

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

  const handleEditBiohazard = () => {
    const editBiohazardPayload = [
      {
        title: editTitle,
        description: editDescription
      }
    ]
    console.log(editBiohazardPayload)
    handleEditClose()
  }

  const columns = [
    {
      flex: 0.2,
      minWidth: 250,
      field: 'title',
      headerName: 'Title',
      renderCell: params => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon icon='uiw:file-pdf' />
            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '24px' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {params.row.id}
              </Typography>
              <Typography noWrap variant='caption'>
                {params.row.title}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 250,
      headerName: 'Description',
      field: 'description',

      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
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
      flex: 0.15,
      type: 'date',
      minWidth: 120,
      headerName: 'Uploaded Date',
      field: 'uploaded_date',
      valueGetter: params => new Date(params.value),
      renderCell: params => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.uploaded_date}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'actions',
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
        <DialogTitle id='form-dialog-title'>Edit Biohazard Dispose</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField label='Title' fullWidth value={editTitle} onChange={e => setEditTitle(e.target.value)} />
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
          <Button onClick={handleEditBiohazard} variant='contained'>
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
