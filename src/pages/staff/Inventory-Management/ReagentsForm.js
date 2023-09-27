// InventoryForm.js
import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [inventoryNo, setInventoryNo] = React.useState('')
  const [inventoryName, setInventoryName] = React.useState('')
  const [availability, setAvailability] = React.useState('')
  const [newlyArrivals, setNewlyArrivals] = React.useState('')
  const [broken, setBroken] = React.useState('')
  const [returns, setReturns] = React.useState('')

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setInventoryNo(editItem.inventoryNo)
      setInventoryName(editItem.inventoryName)
      setAvailability(editItem.availability)
      setNewlyArrivals(editItem.newlyArrivals)
      setBroken(editItem.broken)
      setReturns(editItem.returns)
    }
  }, [editItem])

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      inventoryNo,
      inventoryName,
      availability,
      newlyArrivals,
      broken,
      returns
    }

    // Pass the data to the parent component
    onSubmit(formData)

    // Clear the form fields
    setInventoryNo('')
    setInventoryName('')
    setAvailability('')
    setNewlyArrivals('')
    setBroken('')
    setReturns('')

    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
        {editItem ? 'Edit Inventory Details' : 'Add New Inventory Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label='Inventory No'
          fullWidth
          value={inventoryNo}
          onChange={e => setInventoryNo(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Inventory Name'
          fullWidth
          value={inventoryName}
          onChange={e => setInventoryName(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Availability'
          fullWidth
          value={availability}
          onChange={e => setAvailability(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Newly Arrivals'
          fullWidth
          value={newlyArrivals}
          onChange={e => setNewlyArrivals(e.target.value)}
          margin='normal'
        />
        <TextField label='Broken' fullWidth value={broken} onChange={e => setBroken(e.target.value)} margin='normal' />
        <TextField
          label='Returns'
          fullWidth
          value={returns}
          onChange={e => setReturns(e.target.value)}
          margin='normal'
        />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm
