import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomTextField from 'src/@core/components/mui/text-field';
import TableFilter from './TableFilter';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Reagents= () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setType('');
    setLocation('');
    setHazardClass('');
    setMaxQuantity('');
    setBalance('');
  };

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [hazardClass, setHazardClass] = useState('');
  const [maxQuantity, setMaxQuantity] = useState('');
  const [balance, setBalance] = useState('');

  const handleAddReagents= () => {
    const addInstrumentPayload = [
      {
        title: title,
        type: type,
        MSDs_location: location,
        hazard_class: hazardClass,
        maximum_quantity: maxQuantity,
        balance: balance,
      },
    ];
    console.log(addInstrumentPayload);
    handleClose();
  };

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title='Reagents'
              action={
                <Button variant='contained' onClick={handleClickOpen} startIcon={<Icon icon='uil:plus' />}>
                  Add Reagents
                </Button>
              }
            ></CardHeader>
            <CardContent>
              <TableFilter />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Add Reagents details</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField label='Chemical Name' fullWidth value={title} onChange={e => setTitle(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Type' fullWidth value={type} onChange={e => setType(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='MSDs Location' fullWidth value={location} onChange={e => setLocation(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Hazard Class' fullWidth value={hazardClass} onChange={e => setHazardClass(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Maximum Quantity' fullWidth value={maxQuantity} onChange={e => setMaxQuantity(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Balance' fullWidth value={balance} onChange={e => setBalance(e.target.value)} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleAddReagents} variant='contained'>
            Add
          </Button>
          <Button onClick={handleClose} variant='contained' color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Reagents;
