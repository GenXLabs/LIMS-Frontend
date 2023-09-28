import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { CardContent, Grid, TextField } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import UsersTable from 'src/views/table/usersTable'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TableFilter from './TableFilter'
import { useRouter } from 'next/router'

// import { co } from '@fullcalendar/core/internal-common'

const UserAccounts = () => {
  const router = useRouter()

  const handleAdd = () => {
    console.log('add user')
    router.push('/admin/add-user')

   






  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='User Accounts' action={<Button variant='contained' onClick={handleAdd}>Add user</Button>}></CardHeader>
          <CardContent>
            <TableFilter />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserAccounts
