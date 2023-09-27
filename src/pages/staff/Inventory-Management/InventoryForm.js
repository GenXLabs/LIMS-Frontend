import React from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button, Typography } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit }) => {
  const [inventoryNo, setInventoryNo] = React.useState('')
  const [inventoryName, setInventoryName] = React.useState('')
  const [availability, setAvailability] = React.useState('')
  const [newlyArrivals, setNewlyArrivals] = React.useState('')
  const [broken, setBroken] = React.useState('')
  const [returns, setReturns] = React.useState('')

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
      {/* Style the title */}
      <DialogTitle>
        <Typography variant="h6" style={{ fontWeight: 'bold' }}>
          Add New Inventory Details
        </Typography>
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
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm
