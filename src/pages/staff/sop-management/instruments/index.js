import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import TableFilter from './TableFilter'
import { useRouter } from 'next/router'

const ViewInstrument = () => {
  const route = useRouter()

  const handleAddInstument = () => {
    route.push('/staff/sop-management/instruments/addInstrument')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Instrument'
            action={
              <Button variant='contained' onClick={handleAddInstument}>
                Add Instrument
              </Button>
            }
          ></CardHeader>
          <CardContent>
            <TableFilter />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewInstrument
