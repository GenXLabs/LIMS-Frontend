import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [chemicalName, setChemicalName] = React.useState('')
  const [type, setType] = React.useState('')
  const [msdsLocation, setMsdsLocation] = React.useState('')
  const [hazardClass, setHazardClass] = React.useState('')
  const [maxQuantity, setMaxQuantity] = React.useState('')
  const [balance, setBalance] = React.useState('')

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setChemicalName(editItem.chemicalName)
      setType(editItem.type)
      setMsdsLocation(editItem.msdsLocation)
      setHazardClass(editItem.hazardClass)
      setMaxQuantity(editItem.maxQuantity)
      setBalance(editItem.balance)
    }
  }, [editItem])

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      chemicalName,
      type,
      msdsLocation,
      hazardClass,
      maxQuantity,
      balance
    }

    // Pass the data to the parent component
    onSubmit(formData)

    // Clear the form fields
    setChemicalName('')
    setType('')
    setMsdsLocation('')
    setHazardClass('')
    setMaxQuantity('')
    setBalance('')

    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
        {editItem ? 'Edit Chemical Details' : 'Add New Chemical Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label='Name of the chemical'
          fullWidth
          value={chemicalName}
          onChange={e => setChemicalName(e.target.value)}
          margin='normal'
        />
        <TextField label='Type' fullWidth value={type} onChange={e => setType(e.target.value)} margin='normal' />
        <TextField
          label='MSDs location'
          fullWidth
          value={msdsLocation}
          onChange={e => setMsdsLocation(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Hazard Class'
          fullWidth
          value={hazardClass}
          onChange={e => setHazardClass(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Maximum Quantity'
          fullWidth
          value={maxQuantity}
          onChange={e => setMaxQuantity(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Balance'
          fullWidth
          value={balance}
          onChange={e => setBalance(e.target.value)}
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
