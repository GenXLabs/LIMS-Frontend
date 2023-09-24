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

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const[isUniquEmail, setIsUniqueEmail] = useState(true)

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
  const handleSignUp = async () => {
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
        console.log("email not found ",err)
      }

      // if email is unique, register the user
      try {
        const res = await axios.post('http://localhost:8082/api/v1/lims/user/add', userData)
        console.log(res.data)
        toast.success('Registration successful')
        router.push('/login')
      } catch (err) {
        console.log(err)
        toast.error('Registration failed')
      }
        

          
    }
  }

  return (
    <Box className='content-right' sx={{ backgroundColor: 'background.paper' }}>
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            borderRadius: '20px',
            justifyContent: 'center',
            backgroundColor: 'customColors.bodyBg',
            margin: theme => theme.spacing(8, 0, 8, 8)
          }}
        >
          {/* <RegisterIllustration
            alt='register-illustration'
            src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
          /> */}
          <FooterIllustrationsV2 />
        </Box>
      ) : null}
      <RightWrapper>
        <Box
          sx={{
            p: [6, 12],
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            {/* <svg width={34} viewBox='0 0 32 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z'
              />
              <path
                fill='#161616'
                opacity={0.06}
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                fill={theme.palette.primary.main}
                d='M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z'
              />
            </svg> */}
            {/* <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Adventure starts here 🚀
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Make your app management easy and fun!</Typography>
            </Box> */}
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
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
                onChange={e => setFirstName(e.target.value)}
              />
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
                onChange={e => setLastName(e.target.value)}
              />
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
                onChange={e => setEmail(e.target.value)}
              />
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
                onChange={e => setPhoneNumber(e.target.value)}
              />
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
                onChange={e => setPassword(e.target.value)}
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
                onChange={e => setConfirmPassword(e.target.value)}
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
              <FormControlLabel
                control={<Checkbox />}
                sx={{ mb: 4, mt: 1.5, '& .MuiFormControlLabel-label': { fontSize: theme.typography.body2.fontSize } }}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Typography sx={{ color: 'text.secondary' }}>I agree to</Typography>
                    <Typography component={LinkStyled} href='/' onClick={e => e.preventDefault()} sx={{ ml: 1 }}>
                      privacy policy & terms
                    </Typography>
                  </Box>
                }
              />
              <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }} onClick={handleSignUp}>
                Sign up
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary', mr: 2 }}>Already have an account?</Typography>
                <Typography component={LinkStyled} href='/login'>
                  Sign in instead
                </Typography>
              </Box>
              {/* <Divider
                sx={{
                  color: 'text.disabled',
                  '& .MuiDivider-wrapper': { px: 6 },
                  fontSize: theme.typography.body2.fontSize,
                  my: theme => `${theme.spacing(6)} !important`
                }}
              >
                or
              </Divider> */}
              {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconButton href='/' component={Link} sx={{ color: '#497ce2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:facebook' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#1da1f2' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:twitter' />
                </IconButton>
                <IconButton
                  href='/'
                  component={Link}
                  onClick={e => e.preventDefault()}
                  sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : 'grey.300') }}
                >
                  <Icon icon='mdi:github' />
                </IconButton>
                <IconButton href='/' component={Link} sx={{ color: '#db4437' }} onClick={e => e.preventDefault()}>
                  <Icon icon='mdi:google' />
                </IconButton>
              </Box> */}
            </form>
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
Register.getLayout = page => <BlankLayout>{page}</BlankLayout>
Register.guestGuard = true

export default Register
