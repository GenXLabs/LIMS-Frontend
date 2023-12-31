import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React, { Fragment, useEffect } from 'react'
import Button from '@mui/material/Button'
import TableFilter from './TableFilter'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import MenuItem from '@mui/material/MenuItem'

// import FileUploaderRestrictions from './FileUploder'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import apiDefinitions from 'src/api/apiDefinitions'

import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

const ViewInstrumentCallibrationReports = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)

  const [refreshTable, setRefreshTable] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setTitle('')
    setDescription('')
    setFiles([])

    setTitleError(false)
    setDescriptionError(false)
    setFileError(false)

    setTitleErrorText('')
    setDescriptionErrorText('')
    setFileErrorText('')
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const userData = JSON.parse(localStorage.getItem('userData'))

  const [files, setFiles] = useState([])

  const [titleError, setTitleError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [fileError, setFileError] = useState(false)

  const [titleErrorText, setTitleErrorText] = useState('')
  const [descriptionErrorText, setDescriptionErrorText] = useState('')
  const [fileErrorText, setFileErrorText] = useState('')

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 10000000,
    accept: {
      'application/pdf': ['.pdf']
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
      onFilesUpload(acceptedFiles)
    },
    onDropRejected: () => {
      toast.error('You can only upload 1 file & maximum size of 10 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <Icon icon='tabler:file-description' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleAddInstrumentCallibrationReports = () => {
    let isValid = true

    if (files.length === 0) {
      setFileError(true)
      setFileErrorText('Please upload a file.')
      isValid = false
    } else {
      setFileError(false)
      setFileErrorText('')
    }

    if (title === '') {
      setTitleError(true)
      setTitleErrorText('Please enter a title.')
      isValid = false
    } else {
      setTitleError(false)
      setTitleErrorText('')
    }

    if (description === '') {
      setDescriptionError(true)
      setDescriptionErrorText('Please enter a description.')
      isValid = false
    } else {
      setDescriptionError(false)
      setDescriptionErrorText('')
    }

    if (!isValid) {
      // Exit the function if the form is not valid
      console.error('Form is not valid. Please correct the errors.')

      return
    }

    // Continue with form submission if the form is valid
    const addInternalQualityAssurancePayload = {
      title: title,
      description: description,
      created_by: userData.id
    }
    console.log('addInternalQualityAssurancePayload:', addInternalQualityAssurancePayload)
    const formData = new FormData()

    formData.append(
      'manual',
      new Blob([JSON.stringify(addInternalQualityAssurancePayload)], { type: 'application/json' })
    )
    formData.append('file', files[0]) // Append the first (and only) selected file
    console.log('formData:', formData)
    apiDefinitions
      .createInternalQualityAssurance(formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Manual created:', response.data)
        toast.success('Manual created successfully!')
        setRefreshTable(!refreshTable)
        handleClose()
      })
      .catch(error => {
        console.error('Error creating manual:', error)
        toast.error('Error creating manual!')
      })
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='Instrument Calibration Reports'
              action={
                <Button variant='contained' onClick={handleClickOpen} startIcon={<Icon icon='uil:plus' />}>
                  Upload Instrument Calibration Reports
                </Button>
              }
            ></CardHeader>
            <CardContent>
              <TableFilter refreshTable={refreshTable} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Instrument Calibration Report</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField
                label='Title'
                fullWidth
                value={title}
                onChange={e => setTitle(e.target.value)}
                error={titleError ? titleError : null}
                helperText={titleErrorText ? titleErrorText : null}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Description'
                fullWidth
                multiline
                rows={2}
                value={description}
                onChange={e => setDescription(e.target.value)}
                error={descriptionError ? descriptionError : null}
                helperText={descriptionErrorText ? descriptionErrorText : null}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: 4, mt: 5, border: '1px solid #7367F0', borderRadius: '10px' }}>
            <Fragment>
              {files.length ? (
                <Fragment>
                  <List>{fileList}</List>
                  <div className='buttons'>
                    <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                      Remove All
                    </Button>
                  </div>
                </Fragment>
              ) : (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        display: 'flex',
                        borderRadius: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme => `rgba({theme.palette.customColors.main}, 0.08)`
                      }}
                    >
                      <Icon icon='tabler:upload' fontSize='2.5rem' />
                    </Box>
                    <Typography variant='h4' sx={{ mb: 2.5 }}>
                      Drop files here or click to upload.
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Allowed *.pdf</Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Max 1 file and max size of 10 MB</Typography>
                  </Box>
                </div>
              )}
            </Fragment>
          </Grid>
          {fileError ? (
            <Typography variant='body2' sx={{ mt: 2 }} color='error'>
              {fileErrorText}
            </Typography>
          ) : null}
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleAddInstrumentCallibrationReports} variant='contained'>
            Add
          </Button>
          <Button onClick={handleClose} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ViewInstrumentCallibrationReports
