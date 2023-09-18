import React from 'react'

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

function UserProfile() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={6}>
              <Grid item xs={8}>
                <Box>
                  <AvatarGroup max={4}>
                    <Avatar src='/images/avatars/user1.jpg' alt='Olivia Sparks' sx={{ width: 56, height: 56 }} />
                  </AvatarGroup>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ height: '20px' }}></Box>

        <FormValidationBasic />
      </Grid>
    </Grid>
  )
}

export default UserProfile
