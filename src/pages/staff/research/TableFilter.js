// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import { IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import Grid from '@mui/material/Grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import QuickSearchToolbar from './QuickSearchToolbar'

import apiDefinitions from 'src/api/apiDefinitions'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import toast from 'react-hot-toast'

const escapeRegExp = value => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const TableColumns = () => {
  // ** States
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

  const [refreshData, setRefreshData] = useState(false)

  const [openAddResearch, setOpenAddResearch] = useState(false)

  const [newResearchName, setNewResearchName] = useState('')
  const [newStudyType, setNewStudyType] = useState('')
  const [newBatch, setNewBatch] = useState('')
  const [newNumStudents, setNewNumStudents] = useState('')
  const [newAssignedAssistant, setNewAssignedAssistant] = useState('')
  const [newStartDate, setNewStartDate] = useState('')
  const [newEndDate, setNewEndDate] = useState('')

  // Validation and error state
  const [researchNameError, setResearchNameError] = useState('')
  const [studyTypeError, setStudyTypeError] = useState('')
  const [batchError, setBatchError] = useState('')
  const [numStudentsError, setNumStudentsError] = useState('')
  const [assignedAssistantError, setAssignedAssistantError] = useState('')
  const [startDateError, setStartDateError] = useState('')
  const [endDateError, setEndDateError] = useState('')

  // Function to format a Unix timestamp (in milliseconds) as "YYYY-MM-DD" (e.g., "2023-09-30")
  const formatDate = timestamp => {
    if (!timestamp) {
      return ''
    }

    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    apiDefinitions
      .getAllResearch()
      .then(res => {
        console.log(res.data)

        //add id to data
        res.data.forEach((item, index) => {
          item.id = index + 1
        })

        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [refreshData])

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

  // State to track the item being edited
  const [editingItem, setEditingItem] = useState(null)

  // Function to open the edit form dialog
  const openEditDialog = item => {
    // Convert Unix timestamps (milliseconds) to Date objects for editing
    if (item.start_date) {
      item.start_date = new Date(item.start_date)
    }
    if (item.end_date) {
      item.end_date = new Date(item.end_date)
    }

    setEditingItem(item)
    setOpenAddResearch(true)
  }

  // Function to close the edit form dialog
  const closeEditDialog = () => {
    setEditingItem(null)
    setOpenAddResearch(false)
    setResearchNameError('')
    setStudyTypeError('')
    setBatchError('')
    setNumStudentsError('')
    setAssignedAssistantError('')
    setStartDateError('')
    setEndDateError('')
  }

  const closeAddResearch = () => {
    setOpenAddResearch(false)
    setResearchNameError('')
    setStudyTypeError('')
    setBatchError('')
    setNumStudentsError('')
    setAssignedAssistantError('')
    setStartDateError('')
    setEndDateError('')
  }

  const handleAddResearch = () => {
    // Reset previous error states
    setResearchNameError('')
    setStudyTypeError('')
    setBatchError('')
    setNumStudentsError('')
    setAssignedAssistantError('')
    setStartDateError('')
    setEndDateError('')

    // Validation logic
    let isValid = true

    if (newResearchName === '') {
      setResearchNameError('Research Name is required')
      isValid = false
    }

    if (newStudyType === '') {
      setStudyTypeError('Study Type is required')
      isValid = false
    }

    if (newBatch === '') {
      setBatchError('Batch is required')
      isValid = false
    }

    if (newNumStudents === '') {
      setNumStudentsError('Number of Students is required')
      isValid = false
    }

    if (newAssignedAssistant === '') {
      setAssignedAssistantError('Assigned Assistant is required')
      isValid = false
    }

    if (newStartDate === '') {
      setStartDateError('Start Date is required')
      isValid = false
    }

    if (newEndDate === '') {
      setEndDateError('End Date is required')
      isValid = false
    }

    if (!isValid) {
      return
    }

    const researchPayload = {
      research_name: newResearchName,
      study_type: newStudyType,
      batch: newBatch,
      num_students: newNumStudents,
      assigned_assistant: newAssignedAssistant,
      start_date: newStartDate,
      end_date: newEndDate
    }

    apiDefinitions
      .addResearch(researchPayload)
      .then(res => {
        console.log(res)
        toast.success('Research Work Added Successfully')
        setRefreshData(!refreshData)
        closeAddResearch()
      })
      .catch(err => {
        console.log(err)
        toast.error('Error Adding Research Work')
      })
  }

  const handleEditResearch = () => {
    // Reset previous error states
    setResearchNameError('')
    setStudyTypeError('')
    setBatchError('')
    setNumStudentsError('')
    setAssignedAssistantError('')
    setStartDateError('')
    setEndDateError('')

    // Validation logic, similar to other fields
    let isValid = true

    if (editingItem.research_name === '') {
      setResearchNameError('Research Name is required')
      isValid = false
    }

    if (editingItem.study_type === '') {
      setStudyTypeError('Study Type is required')
      isValid = false
    }

    if (editingItem.batch === '') {
      setBatchError('Batch is required')
      isValid = false
    }

    if (editingItem.num_students === '') {
      setNumStudentsError('Number of Students is required')
      isValid = false
    }

    if (editingItem.assigned_assistant === '') {
      setAssignedAssistantError('Assigned Assistant is required')
      isValid = false
    }

    if (!editingItem.start_date || isNaN(editingItem.start_date.getTime())) {
      setStartDateError('Start Date is required')
      isValid = false
    }

    if (!editingItem.end_date || isNaN(editingItem.end_date.getTime())) {
      setEndDateError('End Date is required')
      isValid = false
    }

    if (!isValid) {
      return
    }

    const editResearchPayload = {
      research_name: editingItem.research_name,
      study_type: editingItem.study_type,
      batch: editingItem.batch,
      num_students: editingItem.num_students,
      assigned_assistant: editingItem.assigned_assistant,
      start_date: editingItem.start_date,
      end_date: editingItem.end_date
    }

    console.log(editingItem.research_id, editResearchPayload)

    apiDefinitions
      .updateResearch(editingItem.id, editResearchPayload)
      .then(res => {
        console.log(res)
        toast.success('Research Work Updated Successfully')
        setRefreshData(!refreshData)
        closeEditDialog()
      })
      .catch(err => {
        console.log(err)
        toast.error('Error Updating Research Work')
      })
  }

  const deleteResearch = item => {
    apiDefinitions
      .deleteResearch(item.research_id)
      .then(res => {
        console.log(res)
        toast.success('Research Work Deleted Successfully')
        setRefreshData(!refreshData)
      })
      .catch(err => {
        console.log(err)
        toast.error('Error Deleting Research Work')
      })
  }

  const columns = [
    {
      flex: 1,
      minWidth: 180,
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
      flex: 1,
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
    },

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
    // },
    {
      flex: 0.1,
      field: 'actions',
      minWidth: 100,
      headerName: 'Actions ',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container spacing={5}>
            <Grid item container sm={12}>
              <Grid item sm={6}>
                <IconButton color='primary' onClick={() => openEditDialog(params.row)}>
                  <Icon icon='fluent:edit-16-regular' />
                </IconButton>
              </Grid>
              <Grid item sm={6}>
                <IconButton color='error' onClick={() => deleteResearch(params.row)}>
                  <Icon icon='lucide:trash-2' />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        )
      }
    }
  ]

  return (
    <>
      <Card>
        <CardHeader
          title='Manage Research Work'
          action={
            <Button variant='contained' color='primary' size='medium' onClick={() => setOpenAddResearch(true)}>
              Add Research Work
            </Button>
          }
        />
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
      <Dialog open={openAddResearch} onClose={closeEditDialog} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{editingItem ? 'Edit Research Work' : 'Add New Research Work'}</DialogTitle>
        <DialogContent sx={{ minWidth: '600px' }}>
          <form onSubmit={editingItem ? handleEditResearch : handleAddResearch}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CustomTextField
                  id='researchName'
                  fullWidth
                  type='text'
                  label='Research Name'
                  value={editingItem ? editingItem.research_name : newResearchName}
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          research_name: e.target.value
                        })
                      : setNewResearchName(e.target.value)
                  }
                  error={!!researchNameError}
                  helperText={researchNameError}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id='studyType'
                  fullWidth
                  type='text'
                  label='Study Type'
                  value={editingItem ? editingItem.study_type : newStudyType}
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          study_type: e.target.value
                        })
                      : setNewStudyType(e.target.value)
                  }
                  error={!!studyTypeError}
                  helperText={studyTypeError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  id='batch'
                  fullWidth
                  type='text'
                  label='Batch'
                  value={editingItem ? editingItem.batch : newBatch}
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          batch: e.target.value
                        })
                      : setNewBatch(e.target.value)
                  }
                  error={!!batchError}
                  helperText={batchError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  id='numStudents'
                  fullWidth
                  type='number'
                  label='Number of Students'
                  value={editingItem ? editingItem.num_students : newNumStudents}
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          num_students: e.target.value
                        })
                      : setNewNumStudents(e.target.value)
                  }
                  error={!!numStudentsError}
                  helperText={numStudentsError}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomTextField
                  id='assignedAssistant'
                  fullWidth
                  type='text'
                  label='Assigned Assistant'
                  value={editingItem ? editingItem.assigned_assistant : newAssignedAssistant}
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          assigned_assistant: e.target.value
                        })
                      : setNewAssignedAssistant(e.target.value)
                  }
                  error={!!assignedAssistantError}
                  helperText={assignedAssistantError}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  id='startDate'
                  fullWidth
                  type='date'
                  label='Start Date'
                  value={
                    editingItem && editingItem.start_date instanceof Date
                      ? formatDate(editingItem.start_date)
                      : formatDate(newStartDate)
                  }
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          start_date: new Date(e.target.value)
                        })
                      : setNewStartDate(e.target.value)
                  }
                  error={!!startDateError}
                  helperText={startDateError}
                  InputLabelProps={{
                    shrink: true // Ensures that the label "floats" when there's a value
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  id='endDate'
                  fullWidth
                  type='date'
                  label='End Date'
                  value={
                    editingItem && editingItem.end_date instanceof Date
                      ? formatDate(editingItem.end_date)
                      : formatDate(newEndDate)
                  }
                  onChange={e =>
                    editingItem
                      ? setEditingItem({
                          ...editingItem,
                          end_date: new Date(e.target.value)
                        })
                      : setNewEndDate(e.target.value)
                  }
                  error={!!endDateError}
                  helperText={endDateError}
                  InputLabelProps={{
                    shrink: true // Ensures that the label "floats" when there's a value
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='contained' type='submit' onClick={editingItem ? handleEditResearch : handleAddResearch}>
            {editingItem ? 'Save' : 'Add'}
          </Button>
          <Button variant='contained' color='error' onClick={closeEditDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TableColumns
