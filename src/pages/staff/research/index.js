import { Tab, Table } from '@mui/material'
import React from 'react'
import { CardContent, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableFilter from './TableFilter'
import Button from '@mui/material/Button'



const StaffResearch = () => {
  return (
    <Grid container spacing={6}>
    <Grid item xs={12}>
      <Card>
        <CardHeader title='Research' action={<Button variant='contained'>Add Rasearch</Button>}></CardHeader>
        <CardContent>
          <TableFilter />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
  )
}

export default StaffResearch
