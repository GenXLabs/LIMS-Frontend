import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import TableFilter from './TableFilter'

const ViewInstrument = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Instrument' action={<Button variant='contained' >Add Instrument</Button>}></CardHeader>
          <CardContent>
            <TableFilter />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewInstrument
