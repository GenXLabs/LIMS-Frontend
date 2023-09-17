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

//styeld container for page
const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}))

//profile pic container for profile pic img and edit button and delete button
const AvatarDetailContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '20px',
  marginBottom: '20px'
}))

//container for profile pic img
const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    height: '100px',
    ObjectFit: 'contain',
    borderRadius: '50%'
  }
}))

//container for edit and delete buttons
const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  button: {
    margin: '0 10px'
  }
}))

//container for profile details
const ProfileDetailsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '20px',
  marginBottom: '50px'
}))

//container for profile details left side
const LeftSide = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  marginRigth: '50px'
}))

//container for profile details right side
const RightSide = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flex: 1,
  marginLeft: '50px'
}))

//container for password change
const PasswordContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  marginTop: '20px'
}))

//container for save changes button
const SaveChangesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '30px'
}))

//container for save changes button left side
const LeftButtons = styled(Box)(({ theme }) => ({
  display: 'flex'
}))

//container for save changes button right side
const RightButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  button: {
    margin: '0 10px'
  }
}))

function userProfile() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='User Profile'></CardHeader>
          <CardContent>
            <Divider />
            <AvatarDetailContainer>
              <AvatarContainer>
                {/* profile image */}
                <img src='/images/avatars/1.png' />
                {/* name  */}
                <Typography variant='h5' style={{ marginLeft: '10px' }}>
                  Name
                </Typography>
              </AvatarContainer>
              <ButtonContainer>
                <Button variant='tonal' color='info'>
                  Update new photo
                </Button>
                <Button variant='tonal' color='error'>
                  Delete
                </Button>
              </ButtonContainer>
            </AvatarDetailContainer>
            <Divider />
            {/* profile details container */}
            <ProfileDetailsContainer>
              <LeftSide>
                <TextField id='outlined-basic' label='First name' variant='standard' />
                <TextField id='outlined-basic' label='username' variant='standard' />
              </LeftSide>

              <RightSide>
                <TextField id='outlined-basic' label='Last name' variant='standard' />
                <TextField id='outlined-basic' label='email' variant='standard' type='email' />
              </RightSide>
            </ProfileDetailsContainer>

            <Divider />
            <PasswordContainer>
              <LeftSide>
                <TextField id='outlined-basic' label='Current Password' variant='standard' type='password' />
              </LeftSide>

              <RightSide>
                <TextField id='outlined-basic' label='New Password' variant='standard' type='password' />
              </RightSide>
            </PasswordContainer>
            <TextField id='outlined-basic' label='Confirm Password' variant='standard' type='password' />

            {/* save changes butten container */}
            <SaveChangesContainer>
              <LeftButtons>
                <Button variant='tonal' color='info'>
                  Edit
                </Button>
              </LeftButtons>
              <RightButtons>
                <Button variant='tonal' color='warning'>
                  Cancle
                </Button>
                <Button variant='tonal' color='success'>
                  Save changes
                </Button>
              </RightButtons>
            </SaveChangesContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default userProfile
