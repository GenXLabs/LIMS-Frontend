// ** React Imports
import { useState } from 'react'

// ** Next Import
import Link from 'next/link'
import router from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

import axios from 'axios'
import { Grid } from '@mui/material'

// ** Styled Components
const RegisterIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 600,
  marginTop: theme.spacing(12),
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down(1540)]: {
    maxHeight: 550
  },
  [theme.breakpoints.down('lg')]: {
    maxHeight: 500
  }
}))

const RightWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 450
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 600
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: 750
  }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.75),
  '& .MuiFormControlLabel-label': {
    color: theme.palette.text.secondary
  }
}))

const AddUser = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isUniquEmail, setIsUniqueEmail] = useState(true)

  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const { skin } = settings
  const imageSource = skin === 'bordered' ? 'auth-v2-register-illustration-bordered' : 'auth-v2-register-illustration'

  const [firstNameErrorText, setFirstNameErrorText] = useState('')
  const [lastNameErrorText, setLastNameErrorText] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('')
  const [passwordErrorText, setPasswordErrorText] = useState('')
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('')


  
  // sign up handling
  const handleAdd = async () => {
    console.log('sign up')

    let errorCount = 0

    // validate the form fields
    if (firstName === '') {
      setFirstNameErrorText('First name is required')
      errorCount++
    }
    if (lastName === '') {
      setLastNameErrorText('Last name is required')
      errorCount++
    }
    if (email === '' || !email.includes('@') || !email.includes('.') || email.endsWith('.') || email.endsWith('@')) {
      setEmailErrorText('Valid email is required')
      errorCount++
    }
    if (password === '' || password.length < 6) {
      setPasswordErrorText('Password must be at least 6 characters')
      errorCount++
    }

    if (confirmPassword === '') {
      setConfirmPasswordErrorText('Confirm password is required')
      errorCount++
    }
    if (password !== confirmPassword) {
      setConfirmPasswordErrorText('Passwords do not match')
      errorCount++
    }
    if (phoneNumber === '' || phoneNumber.length !== 10 || !phoneNumber.startsWith('07') || isNaN(phoneNumber)) {
      setPhoneNumberErrorText('Valid phone number is required')
      errorCount++
    }

    if (errorCount === 0) {
      // if all fields are valid, sign up the user
      const userData = {
        fullName: firstName + ' ' + lastName,
        email: email,
        phoneNumber: phoneNumber,
        password: password
      }
      console.log(userData)

      // localStorage.setItem('userData', JSON.stringify(userData))

      // user can register only if email is unique
      // Check if the email already exists
      // axios
      //   .get(`http://localhost:8082/api/v1/lims/user/getEmail?email=${email}`)
      //   .then(res => {
      //     console.log(res.data)

      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      try {
        const res = await axios.get(`http://localhost:8082/api/v1/lims/user/getEmail?email=${email}`)
        console.log(res.data)
        if (res.data !== null) {
          setIsUniqueEmail(false)
          toast.error('Email already exists')
          console.log('Email already exists')

          return
        }
      } catch (err) {
        console.log('email not found ', err)
      }

      // if email is unique, register the user
      try {
        const res = await axios.post('http://localhost:8082/api/v1/lims/user/add', userData)
        console.log(res.data)
        toast.success('Registration successful')
        router.push('/users/user-accounts')
      } catch (err) {
        console.log(err)
        toast.error('Registration failed')
      }
    }

 


  }

  return (
    <Card>
      <CardHeader title='' />
      <CardContent>
        <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
          <Grid container spacing={4}>
            <Grid item container spacing={4} xs={12} sm={12}>
                <Grid item xs={12} sm={6}>
              <CustomTextField
                autoFocus
                fullWidth
                required
                helperText={firstNameErrorText}
                error={firstNameErrorText !== ''}
                sx={{ mb: 4 }}
                label='First Name'
                placeholder='john'
                value={firstName}
                onChange={e => {
                  setFirstName(e.target.value)
                  if (e.target.value === '') {
                    setFirstNameErrorText('First name is required')
                  } else {
                    setFirstNameErrorText('')
                  }
                }} 
              />
                </Grid>
                <Grid item xs={12} sm={6}>
              <CustomTextField
                autoFocus
                fullWidth
                required
                helperText={lastNameErrorText}
                error={lastNameErrorText !== ''}
                sx={{ mb: 4 }}
                label='Last Name'
                placeholder='doe'
                value={lastName}
                onChange={e => {
                  setLastName(e.target.value)
                  if (e.target.value === '') {
                    setLastNameErrorText('Last name is required')
                  } else {
                    setLastNameErrorText('')
                  }
                }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>

              <CustomTextField
                fullWidth
                label='Email'
                type='email'
                required
                helperText={emailErrorText}
                error={emailErrorText !== ''}
                sx={{ mb: 4 }}
                placeholder='user@email.com'
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (
                    e.target.value === '' ||
                    !e.target.value.includes('@') ||
                    !e.target.value.includes('.') ||
                    e.target.value.endsWith('.') ||
                    e.target.value.endsWith('@')
                  ) {
                    setEmailErrorText('Valid email is required')
                  } else {
                    setEmailErrorText('')
                  }
                }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Phone Number'
                id='auth-login-v2-password'
                required
                helperText={phoneNumberErrorText}
                error={phoneNumberErrorText !== ''}
                type='tel'
                placeholder='0774567890'
                sx={{ mb: 4 }}
                value={phoneNumber}
                onChange={e => {
                  setPhoneNumber(e.target.value)
                  if (e.target.value.length !== 10 || !e.target.value.startsWith('07') || isNaN(e.target.value)) {
                    setPhoneNumberErrorText('Valid phone number is required')
                  } else {
                    setPhoneNumberErrorText('')
                  }
                }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>

              <CustomTextField
                fullWidth
                label='Password'
                id='auth-login-v2-password'
                required
                helperText={passwordErrorText}
                error={passwordErrorText !== ''}
                type={showPassword ? 'text' : 'password'}
                placeholder='**********'
                sx={{ mb: 4 }}
                value={password}
                onChange={e => {
                  setPassword(e.target.value)
                  if (e.target.value === '' || e.target.value.length < 6) {
                    setPasswordErrorText('Password must be at least 6 characters')
                  } else {
                    setPasswordErrorText('')
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
                </Grid>
                <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Confirm Password'
                id='auth-login-v2-password'
                required
                helperText={confirmPasswordErrorText}
                error={confirmPasswordErrorText !== ''}
                type={showPassword ? 'text' : 'password'}
                placeholder='**********'
                sx={{ mb: 4 }}
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value)
                  if (e.target.value === '') {
                    setConfirmPasswordErrorText('Confirm password is required')
                  } else if (e.target.value !== password) {
                    setConfirmPasswordErrorText('Passwords do not match')
                  } else {
                    setConfirmPasswordErrorText('')
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
                </Grid>

            </Grid>
          </Grid>
          <Grid item container justifyContent='flex-end'>
                <Grid item xs={12} sm={2}>
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} onClick={handleAdd}>
                Add User
              </Button>
                </Grid>
            </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AddUser
