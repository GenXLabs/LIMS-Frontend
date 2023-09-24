import React from 'react'
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useState } from 'react'
import TableStickyHeader from './TableStickyHeader.js'

const ModuleCategory = () => {

  const [modalOpen, setModalOpen] = useState(false)

  const handleModalOpen= () => {
    setModalOpen(true)
  }

  const handleModalClose =() =>{
    setModalOpen(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Module Category' action={<Button  onClick={handleModalOpen} variant='contained'>Add Module</Button>} />
          <CardContent>
            <TableStickyHeader />
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={modalOpen} onClose={handleModalClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <CustomTextField id='name' autoFocus fullWidth type='email' label='Email Address' />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleModalClose}>Disagree</Button>
          <Button onClick={handleModalClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default ModuleCategory
