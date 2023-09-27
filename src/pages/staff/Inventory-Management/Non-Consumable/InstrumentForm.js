import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [inventoryNo, setInventoryNo] = React.useState('');
  const [instrumentName, setInstrumentName] = React.useState('');
  const [serialNo, setSerialNo] = React.useState('');
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [doneBy, setDoneBy] = React.useState('');

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setInventoryNo(editItem.inventoryNo);
      setInstrumentName(editItem.instrumentName);
      setSerialNo(editItem.serialNo);
      setDate(editItem.date);
      setTime(editItem.time);
      setDoneBy(editItem.doneBy);
    }
  }, [editItem]);

  const handleSubmit = () => {
    // Create an object with the form data
    const formData = {
      inventoryNo,
      instrumentName,
      serialNo,
      date,
      time,
      doneBy,
    };

    // Pass the data to the parent component
    onSubmit(formData);

    // Clear the form fields
    setInventoryNo('');
    setInstrumentName('');
    setSerialNo('');
    setDate('');
    setTime('');
    setDoneBy('');

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
        {editItem ? 'Edit Instrument Details' : 'Add New Instrument Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Inventory No"
          fullWidth
          value={inventoryNo}
          onChange={(e) => setInventoryNo(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Instrument Name"
          fullWidth
          value={instrumentName}
          onChange={(e) => setInstrumentName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Serial No"
          fullWidth
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Time"
          fullWidth
          value={time}
          onChange={(e) => setTime(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Done By"
          fullWidth
          value={doneBy}
          onChange={(e) => setDoneBy(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;
