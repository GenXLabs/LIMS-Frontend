import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Grid, Button } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomTextField from 'src/@core/components/mui/text-field';
import TableFilter from './TableFilter';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const Anatomy = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModalName('');
    setAmount('');
  };

  const [modalName, setModalName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddAnatomy = () => {
    const addInstrumentPayload = [
      {
        modal_name: modalName,
        amount: amount,
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
              title='Anatomy'
              action={
                <Button variant='contained' onClick={handleClickOpen} startIcon={<Icon icon='uil:plus' />}>
                  Add Anatomy
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
        <DialogTitle id='form-dialog-title'>Add Anatomy details</DialogTitle>
        <DialogContent sx={{ minWidth: '550px' }}>
          <Grid container spacing={6} rowSpacing={5}>
            <Grid item xs={12}>
              <CustomTextField label='Modal Name' fullWidth value={modalName} onChange={e => setModalName(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField label='Amount' fullWidth value={amount} onChange={e => setAmount(e.target.value)} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-actions-dense' sx={{ m: 4 }}>
          <Button onClick={handleAddAnatomy} variant='contained'>
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

export default Anatomy;
