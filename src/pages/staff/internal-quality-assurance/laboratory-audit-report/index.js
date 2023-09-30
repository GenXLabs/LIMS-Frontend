import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import TableFilter from './TableFilter'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import { useState } from 'react'
import Icon from 'src/@core/components/icon'
import TextField from '@mui/material/TextField'
import FileUploaderRestrictions from './FileUploder'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const InstrumentCalibration = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setTitle('')
    setDescription('')
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  console.log(title)
  console.log(description)



  const handleAddInstrument = () => {
    const addInstrumentPayload = [
      {
        title: title,
        description: description
      }
    ]
    console.log(addInstrumentPayload)
    handleClose()
  }

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='Audit reports'
              action={
                <Button variant='contained' onClick={handleClickOpen} startIcon={<Icon icon='uil:plus' />}>
                  Add Audit reports
                </Button>
              }
            ></CardHeader>
            <CardContent>
              <TableFilter />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Upload Audit reports</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField label='Title' fullWidth value={title} onChange={e => setTitle(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Description'
                fullWidth
                multiline
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ p: 4, mt: 5, border: '1px solid #7367F0', borderRadius: '10px' }}>
            <FileUploaderRestrictions />
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleAddInstrument} variant='contained'>
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

export default InstrumentCalibration
