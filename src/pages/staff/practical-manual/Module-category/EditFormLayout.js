/* eslint-disable padding-line-between-statements */

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

// Styled component for the form
const Form = styled('form')(({ theme }) => ({
  maxWidth: 400,
  padding: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`
}))

const EditFormLayout = () => {


  const editSuccess = () =>{
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  return (
    <Card>
      <CardHeader title='' />
      <CardContent sx={{ minHeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h5'>Edit Module Name</Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField fullWidth label='' placeholder='Module 6' />
            </Grid>


            <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(2)} !important` }}>
              <Button type='submit' variant='contained' sx={{ width: '100%' }} onClick={editSuccess}>
                Edit module
              </Button>
            </Grid>
          </Grid>
        </Form>
      </CardContent>
    </Card>
  )
}

export default EditFormLayout
