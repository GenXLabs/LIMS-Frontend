import React, { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material'

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [inventoryNo, setInventoryNo] = React.useState('')
  const [instrumentName, setInstrumentName] = React.useState('')
  const [serialNo, setSerialNo] = React.useState('')
  const [date, setDate] = React.useState('')
  const [time, setTime] = React.useState('')
  const [doneBy, setDoneBy] = React.useState('')
  const [errors, setErrors] = React.useState({})

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setInventoryNo(editItem.inventoryNo)
      setInstrumentName(editItem.instrumentName)
      setSerialNo(editItem.serialNo)
      setDate(editItem.date)
      setTime(editItem.time)
      setDoneBy(editItem.doneBy)
    }
  }, [editItem])

  const validateInventoryNo = value => {
    const regex = /^[iI]\d{3}$/

    return regex.test(value)
  }

  const validateSerialNo = value => {
    const regex = /^[sS]\d{3}$/

    return regex.test(value)
  }

  const validateDate = value => {
    const regex = /^\d{4}-\d{2}-\d{2}$/

    return regex.test(value)
  }

  const validateTime = value => {
    const regex = /^(0[0-9]|1[0-2]):[0-5][0-9](AM|PM|am|pm)$/

    return regex.test(value)
  }

  const handleSubmit = () => {
    const newErrors = {}

    if (!validateInventoryNo(inventoryNo)) {
      newErrors.inventoryNo = 'Invalid inventory number. It should be I or i followed by 3 digits.'
    }

    if (!validateSerialNo(serialNo)) {
      newErrors.serialNo = 'Invalid serial number. It should be S or s followed by 3 digits.'
    }

    if (!validateDate(date)) {
      newErrors.date = 'Invalid date format. It should be YYYY-MM-DD.'
    }

    if (!validateTime(time)) {
      newErrors.time = 'Invalid time format. It should be HH:mmAM/PM.'
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)

      return
    }

    // Create an object with the form data
    const formData = {
      inventoryNo,
      instrumentName,
      serialNo,
      date,
      time,
      doneBy
    }

    // Pass the data to the parent component
    onSubmit(formData)

    // Clear the form fields and errors
    setInventoryNo('')
    setInstrumentName('')
    setSerialNo('')
    setDate('')
    setTime('')
    setDoneBy('')
    setErrors({})

    // Close the dialog
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
        {editItem ? 'Edit Instrument Details' : 'Add New Instrument Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label='Inventory No'
          fullWidth
          value={inventoryNo}
          onChange={e => setInventoryNo(e.target.value)}
          margin='normal'
          error={Boolean(errors.inventoryNo)}
          helperText={errors.inventoryNo}
        />
        <TextField
          label='Instrument Name'
          fullWidth
          value={instrumentName}
          onChange={e => setInstrumentName(e.target.value)}
          margin='normal'
        />
        <TextField
          label='Serial No'
          fullWidth
          value={serialNo}
          onChange={e => setSerialNo(e.target.value)}
          margin='normal'
          error={Boolean(errors.serialNo)}
          helperText={errors.serialNo}
        />
        <TextField
          label='Date'
          fullWidth
          value={date}
          onChange={e => setDate(e.target.value)}
          margin='normal'
          error={Boolean(errors.date)}
          helperText={errors.date}
        />
        <TextField
          label='Time'
          fullWidth
          value={time}
          onChange={e => setTime(e.target.value)}
          margin='normal'
          error={Boolean(errors.time)}
          helperText={errors.time}
        />
        <TextField label='Done By' fullWidth value={doneBy} onChange={e => setDoneBy(e.target.value)} margin='normal' />
        <Button variant='contained' color='primary' onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default InventoryForm
