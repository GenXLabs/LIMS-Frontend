import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const InventoryForm = ({ open, onClose, onSubmit, editItem }) => {
  const [inventoryNo, setInventoryNo] = React.useState('');
  const [inventoryName, setInventoryName] = React.useState('');
  const [availability, setAvailability] = React.useState('');
  const [newlyArrivals, setNewlyArrivals] = React.useState('');
  const [broken, setBroken] = React.useState('');
  const [returns, setReturns] = React.useState('');
  const [errors, setErrors] = React.useState({});

  // Use useEffect to update the form fields when editItem changes
  useEffect(() => {
    if (editItem) {
      setInventoryNo(editItem.inventoryNo);
      setInventoryName(editItem.inventoryName);
      setAvailability(editItem.availability);
      setNewlyArrivals(editItem.newlyArrivals);
      setBroken(editItem.broken);
      setReturns(editItem.returns);
    }
  }, [editItem]);

  const validateInventoryNo = (value) => {
    const regex = /^[iI]\d{3}$/;
    return regex.test(value);
  };

  const validateNumeric = (value) => {
    const regex = /^\d+$/;
    return regex.test(value);
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Validate inventoryNo
    if (!validateInventoryNo(inventoryNo)) {
      newErrors.inventoryNo = 'Invalid inventory number. It should be I or i followed by 3 digits.';
    }

    // Validate availability, newlyArrivals, broken, and returns
    if (!validateNumeric(availability)) {
      newErrors.availability = 'Availability should be numbers only.';
    }

    if (!validateNumeric(newlyArrivals)) {
      newErrors.newlyArrivals = 'Newly Arrivals should be numbers only.';
    }

    if (!validateNumeric(broken)) {
      newErrors.broken = 'Broken should be numbers only.';
    }

    if (!validateNumeric(returns)) {
      newErrors.returns = 'Returns should be numbers only.';
    }

    // If there are errors, set them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Create an object with the form data
    const formData = {
      inventoryNo,
      inventoryName,
      availability,
      newlyArrivals,
      broken,
      returns,
    };

    // Pass the data to the parent component
    onSubmit(formData);

    // Clear the form fields and errors
    setInventoryNo('');
    setInventoryName('');
    setAvailability('');
    setNewlyArrivals('');
    setBroken('');
    setReturns('');
    setErrors({});

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ fontWeight: 'bold', fontSize: '20px' }}>
        {editItem ? 'Edit Glassware Details' : 'Add New Glassware Details'}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Inventory No"
          fullWidth
          value={inventoryNo}
          onChange={(e) => setInventoryNo(e.target.value)}
          margin="normal"
          error={Boolean(errors.inventoryNo)}
          helperText={errors.inventoryNo}
        />
        <TextField
          label="Inventory Name"
          fullWidth
          value={inventoryName}
          onChange={(e) => setInventoryName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Availability"
          fullWidth
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          margin="normal"
          error={Boolean(errors.availability)}
          helperText={errors.availability}
        />
        <TextField
          label="Newly Arrivals"
          fullWidth
          value={newlyArrivals}
          onChange={(e) => setNewlyArrivals(e.target.value)}
          margin="normal"
          error={Boolean(errors.newlyArrivals)}
          helperText={errors.newlyArrivals}
        />
        <TextField
          label="Broken"
          fullWidth
          value={broken}
          onChange={(e) => setBroken(e.target.value)}
          margin="normal"
          error={Boolean(errors.broken)}
          helperText={errors.broken}
        />
        <TextField
          label="Returns"
          fullWidth
          value={returns}
          onChange={(e) => setReturns(e.target.value)}
          margin="normal"
          error={Boolean(errors.returns)}
          helperText={errors.returns}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {editItem ? 'Update' : 'Submit'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;

