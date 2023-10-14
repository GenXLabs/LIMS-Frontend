import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [chemicalName, setChemicalName] = React.useState('')
  const [type, setType] = React.useState('')
  const [msdsLocation, setMsdsLocation] = React.useState('')
  const [hazardClass, setHazardClass] = React.useState('')
  const [maxQuantity, setMaxQuantity] = React.useState('')
  const [balance, setBalance] = React.useState('')
  const [errors, setErrors] = React.useState({})

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

  const validateType = value => {
    const regex = /^[a-zA-Z]$/

    return regex.test(value)
  }

  const validateHazardClass = value => {
    const regex = /^[a-zA-Z]$/

    return regex.test(value)
  }

  const validateNumeric = value => {
    const regex = /^\d+$/

    return regex.test(value)
  }

  const handleSubmit = () => {
    const newErrors = {}

    // Validate type
    if (!validateType(type)) {
      newErrors.type = 'Type should be one English letter only.'
    }

    // Validate hazard class
    if (!validateHazardClass(hazardClass)) {
      newErrors.hazardClass = 'Hazard class should be one English letter only.'
    }

    // Validate max quantity and balance
    if (!validateNumeric(maxQuantity)) {
      newErrors.maxQuantity = 'Maximum quantity should be numbers only.'
    }

    if (!validateNumeric(balance)) {
      newErrors.balance = 'Balance should be numbers only.'
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)

      return
    }

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

    // Clear the form fields and errors
    setChemicalName('')
    setType('')
    setMsdsLocation('')
    setHazardClass('')
    setMaxQuantity('')
    setBalance('')
    setErrors({})

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
        <TextField
          label='Type'
          fullWidth
          value={type}
          onChange={e => setType(e.target.value)}
          margin='normal'
          error={Boolean(errors.type)}
          helperText={errors.type}
        />
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
          error={Boolean(errors.hazardClass)}
          helperText={errors.hazardClass}
        />
        <TextField
          label='Maximum Quantity'
          fullWidth
          value={maxQuantity}
          onChange={e => setMaxQuantity(e.target.value)}
          margin='normal'
          error={Boolean(errors.maxQuantity)}
          helperText={errors.maxQuantity}
        />
        <TextField
          label='Balance'
          fullWidth
          value={balance}
          onChange={e => setBalance(e.target.value)}
          margin='normal'
          error={Boolean(errors.balance)}
          helperText={errors.balance}
        />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm
