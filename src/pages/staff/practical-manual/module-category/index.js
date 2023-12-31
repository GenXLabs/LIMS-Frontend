import React from 'react'
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { useState } from 'react'
import TableStickyHeader from './TableStickyHeader.js'
import apiDefinitions from 'src/api/apiDefinitions.js'

import toast from 'react-hot-toast'

const ModuleCategory = () => {
  const [addModalState, setAddModalState] = useState(false)

  const [newModuleCategory, setNewModuleCategory] = useState('')

  const userData = JSON.parse(localStorage.getItem('userData'))

  const [refreshTable2, setRefreshTable2] = useState(false)

  const handleAddModuleCat = () => {
    console.log('Add Module Category', newModuleCategory)

    apiDefinitions
      .addModuleCategory({ category_name: newModuleCategory, created_by: userData.id })
      .then(() => {
        toast.success('Module Category Added Successfully')
        setRefreshTable2(!refreshTable2)
        setNewModuleCategory('')
        setAddModalState(false)
      })
      .catch(err => {
        console.log('Error Adding Module Category', err)
        toast.error('Error Adding Module Category')
        setNewModuleCategory('')
        setAddModalState(false)
      })
  }

  const handleAddModalOpen = () => {
    setAddModalState(true)
  }

  const handleModuleCatCancel = () => {
    setAddModalState(false)
    setNewModuleCategory('')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Module Category'
            action={
              <Button onClick={handleAddModalOpen} variant='contained'>
                Add Module
              </Button>
            }
          />
          <CardContent>
            <TableStickyHeader refreshTable2={refreshTable2} />
          </CardContent>
        </Card>
      </Grid>
      <Dialog open={addModalState} onClose={handleModuleCatCancel} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Module Category</DialogTitle>
        <DialogContent sx={{ minWidth: '500px' }}>
          <CustomTextField
            id='moduleCategory'
            fullWidth
            type='text'
            label='Module Category Name'
            value={newModuleCategory}
            onChange={e => setNewModuleCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button onClick={handleAddModuleCat} variant='contained'>
            Add
          </Button>
          <Button onClick={handleModuleCatCancel} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default ModuleCategory
