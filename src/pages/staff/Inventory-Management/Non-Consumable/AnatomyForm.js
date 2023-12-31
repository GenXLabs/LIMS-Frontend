import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [modalName, setModalName] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [errors, setErrors] = React.useState({})

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setModalName(editItem.modalName)
      setAmount(editItem.amount)
    }
  }, [editItem])

  const handleSubmit = () => {
    const newErrors = {}

    // Validate modalName
    if (modalName.trim() === '') {
      newErrors.modalName = 'Modal Name is required'
    }

    // Validate amount
    if (amount.trim() === '') {
      newErrors.amount = 'Amount is required'
    } else if (!/^\d+$/.test(amount)) {
      newErrors.amount = 'Amount should be numbers only'
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)

      return
    }

    // Create an object with the form data
    const formData = {
      modalName,
      amount
    }

    // Pass the data to the parent component
    onSubmit(formData)

    // Clear the form fields and errors
    setModalName('')
    setAmount('')
    setErrors({})

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
          error={Boolean(errors.modalName)}
          helperText={errors.modalName}
        />
        <TextField
          label='Amount'
          fullWidth
          value={amount}
          onChange={e => setAmount(e.target.value)}
          margin='normal'
          error={Boolean(errors.amount)}
          helperText={errors.amount}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm
