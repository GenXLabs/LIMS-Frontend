
import React from 'react';
import { Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
  TextField,
} from '@mui/material';

const FormLayoutsSeparator = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader title='Edit Module Confirmation' />
        <Divider sx={{ m: '0 !important' }} />
        <CardContent>
          {/* Add your form fields here */}
          <TextField
            label='Are you sure want to edit this module?'
            variant='outlined'
            fullWidth

            // Add more props as needed
          />
          {/* Add more form fields as needed */}
        </CardContent>
        <CardActions>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' color='primary'>
            Proceed
          </Button>
          <Button type='button' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormLayoutsSeparator ;
