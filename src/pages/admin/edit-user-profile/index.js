import React from 'react'
import { useRouter } from 'next/router'
import { useEffect,useState } from 'react'

//import styled components
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import input from 'src/@core/theme/overrides/input'
import { margin } from '@mui/system'
import { TextField } from '@mui/material'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormValidationBasic from './FormValidationBasic'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'


const UserProfile = () => {
  const router = useRouter()
  const [userId,setUserId] = useState('')


  useEffect(() => {
  setUserId(router.query.userId)
  console.log("userId",router.query.userId)
  },[router.query.userId])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item container alignItems='center' xs={12}>
                <Grid item xs={6}>
                  <AvatarGroup max={4}>
                    <Avatar src='/images/avatars/user1.jpg' alt='Olivia Sparks' sx={{ width: 56, height: 56 }} />
                  </AvatarGroup>
                </Grid>
                <Grid item container justifyContent='flex-end' xs={6}>
                  {/* two btns for update image and delete */}
                  <Button variant='contained' color='primary' sx={{ mr: 2 }}>
                    Update
                  </Button>
                  <Button variant='contained' color='error'>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ height: '30px' }}></Box>

        <FormValidationBasic />
      </Grid>
    </Grid>
  )
}

export default UserProfile
