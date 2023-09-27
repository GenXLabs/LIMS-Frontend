import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [modalName, setModalName] = React.useState('')
  const [amount, setAmount] = React.useState('')

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setModalName(editItem.modalName)
      setAmount(editItem.amount)
    }
  }, [editItem])

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      modalName,
      amount
    }

    // Pass the data to the parent component
    onSubmit(formData)

    // Clear the form fields
    setModalName('')
    setAmount('')

    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
        {editItem ? 'Edit Modal Details' : 'Add New Modal Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label='Modal Name'
          fullWidth
          value={modalName}
          onChange={e => setModalName(e.target.value)}
          margin='normal'
        />
        <TextField label='Amount' fullWidth value={amount} onChange={e => setAmount(e.target.value)} margin='normal' />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm
