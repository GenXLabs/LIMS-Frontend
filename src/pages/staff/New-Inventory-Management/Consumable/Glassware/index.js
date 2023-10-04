import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomTextField from 'src/@core/components/mui/text-field';
import TableFilter from './TableFilter';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Glassware = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setDescription('');
    setAvailability('');
    setNewlyArrivals('');
    setBroken('');
    setReturnVal('');
    setBalance('');
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [availability, setAvailability] = useState('');
  const [newlyArrivals, setNewlyArrivals] = useState('');
  const [broken, setBroken] = useState('');
  const [returnVal, setReturnVal] = useState('');
  const [balance, setBalance] = useState('');

  const handleAddGlassware = () => {
    const addInstrumentPayload = [
      {
        title: title,
        description: description,
        availability: availability,
        newly_arrivals: newlyArrivals,
        broken: broken,
        return: returnVal,
        balance: balance
      }
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
              title='Glassware'
              action={
                <Button variant='contained' onClick={handleClickOpen} startIcon={<Icon icon='uil:plus' />}>
                  Add Glassware
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
        <DialogTitle id='form-dialog-title'>Add glassware details</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField label='Inventory NO' fullWidth value={title} onChange={e => setNo(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Inventory Name' fullWidth value={description} onChange={e => setName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Availability' fullWidth value={availability} onChange={e => setAvailability(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Newly Arrivals' fullWidth value={newlyArrivals} onChange={e => setNewlyArrivals(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Broken' fullWidth value={broken} onChange={e => setBroken(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Return' fullWidth value={returnVal} onChange={e => setReturnVal(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Balance' fullWidth value={balance} onChange={e => setBalance(e.target.value)} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleAddGlassware} variant='contained'>
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

export default Glassware;
