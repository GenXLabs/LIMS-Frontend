import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button'
import TableFilter from './TableFilter'
import { useRouter } from 'next/router'

const ViewBiohazard = () => {
  const route = useRouter()

  const handleAddBiohazardDispose = () => {
    route.push('/staff/sop-management/biohazard-dispose/addBiohazardDispose')
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Biohazard Dispose'
           action=
          {<Button variant='contained'onClick={handleAddBiohazardDispose} >Add BiohazardDispose</Button>}></CardHeader>
          <CardContent>
            <TableFilter />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ViewBiohazard
