import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { TextField } from '@mui/material'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'
import ModuleTable from 'src/views/table/ModuleTable'

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}))

const UserAdd = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '5px',
  marginBottom: '20px',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)'
}))

const ModuleCategory = () => {
  return (
    <Container>
      <UserAdd>
        <Typography variant='h6'>show</Typography>
        <Box>
          <CustomTextField sx={{ mr: 4 }} placeholder='Search Module' />
          <Button variant='contained' sx={{ '& svg': { mr: 2 } }}>
            <Icon fontSize='1.125rem' icon='tabler:plus' />
            Add Module
          </Button>
        </Box>
      </UserAdd>
      <Divider />
      <ModuleTable />
    </Container>
  )
}

export default ModuleCategory
