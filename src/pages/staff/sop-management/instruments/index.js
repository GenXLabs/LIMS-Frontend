import { Card, CardContent, Grid } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import TableFilter from './TableFilter'

const ViewInstrument = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <TableFilter />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewInstrument
