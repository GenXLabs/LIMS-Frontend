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
import toast from 'react-hot-toast'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = refreshTable => {
  // ** States
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [refreshTable2, setRefreshTable2] = useState(false)

  const [editOpen, setEditOpen] = useState(false)


  const userData = JSON.parse(localStorage.getItem('userData'))

  const [editManualID, setEditManualID] = useState('')

  const handleEditOpen = row => {
    setEditOpen(true)
    setEditTitle(row.title)
    setEditDescription(row.description)
    setEditManualID(row.manual_id)

    console.log(editOpen)
  }

  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  const handleEditClose = () => {
    setEditOpen(false)
    setEditTitle('')
    setEditDescription('')
    setEditManualID('')
  }

  useEffect(() => {
    apiDefinitions
      .getAllBiohazard()
      .then(res => {
        // Filter out records where "deleted_at" is not null
        const filteredData = res.data.data.filter(manual => manual.deleted_at === null)

        // Add an "id" field to each record
        const dataWithId = filteredData.map((record, index) => ({
          ...record,
          id: index + 1 // You can replace this with the desired value for "id"
        }))

        console.log(dataWithId)
        setData(dataWithId)
      })
      .catch(err => console.log(err))
  }, [refreshTable, refreshTable2])

  const handleEditBiohazardDispose = () => {
    const editBiohazardPayload = {
      title: editTitle,
      description: editDescription,
      updated_by: userData.id
    }

    apiDefinitions
      .updateBiohazard(editManualID, editBiohazardPayload)
      .then(res => {
        console.log(res)
        toast.success(' Updated Successfully')
        setRefreshTable2(!refreshTable2)
      })
      .catch(err => {
        console.log(err)
        toast.error('Error Updating ')
      })

    console.log(editBiohazardPayload)
    handleEditClose()
  }

  const UploadedByCell = ({ createdBy }) => {
    // Define a state variable to store the full name
    const [fullName, setFullName] = useState('')

    // Use useEffect to make the API call and update the full name when the component mounts
    useEffect(() => {
      apiDefinitions
        .getUserById(createdBy)
        .then(response => {
          // Assuming the API response contains a 'data' object with a 'fullName' property
          const userFullName = response.data.fullName
          setFullName(userFullName)
        })
        .catch(error => {
          console.error('Error fetching user data:', error)
        })
    }, [createdBy])

    return (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {fullName}
      </Typography>
    )
  }

  const handleDeleteBio = row => {
    const deleteBioPayload = {
      deleted_by: userData.id
    }

    apiDefinitions
      .deleteBiohazard(row.manual_id, deleteBioPayload)
      .then(res => {
        console.log(res)
        toast.success(' Deleted Successfully')
        setRefreshTable2(!refreshTable2)
      })
      .catch(err => {
        console.log(err)
        toast.error('Error Deleting ')
      })
  }

  const handlePDFDownload = row => {
    apiDefinitions
      .getPDFByManualID(row.manual_id)
      .then(res => {
        console.log(res)
        toast.success(' Downloaded Successfully')

        // Create a URL for the blob data
        const url = window.URL.createObjectURL(new Blob([res.data]))

        // Create a temporary link element and trigger a download
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${row.title}_manual_${row.manual_id}.pdf`)
        document.body.appendChild(link)
        link.click()

        // Clean up
        window.URL.revokeObjectURL(url)
      })

      .catch(err => {
        console.log(err)
        toast.error('Error Downloading ')
      })
  }

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
      flex: 0.2,
      minWidth: 220,
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
      flex: 0.25,
      minWidth: 200,
      headerName: 'Uploaded By',
      field: 'created_by',
      renderCell: params => <UploadedByCell createdBy={params.row.created_by} />
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
      field: 'created_at',
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
              <IconButton color='error' onClick={() => handleDeleteBio(params.row)}>
                <Icon icon='lucide:trash-2' />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color='success' onClick={() => handlePDFDownload(params.row)}>
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
        const fieldValue = row[field] ?? '' // Use an empty string as the default value
        const isMatch = searchRegex.test(fieldValue.toString())
        console.log(`Field: ${field}, Value: ${fieldValue}, Match: ${isMatch}`)

        return isMatch
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
        <DialogTitle id='form-dialog-title'>Edit Biohazard Disposes</DialogTitle>
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
          <Button onClick={handleEditBiohazardDispose} variant='contained'>
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
