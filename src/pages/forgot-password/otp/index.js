// ** React Imports
import { useEffect, useState } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

// ** Custom Styled Component
import CleaveWrapper from 'src/@core/styles/libs/react-cleave'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Styles
import 'cleave.js/dist/addons/cleave-phone.us'

import axios from 'axios'

import smsService from 'src/api/sendSMS'

// ** Styled Components
const TwoStepsIllustration = styled('img')(({ theme }) => ({
  zIndex: 2,
  maxHeight: 650,
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

const CleaveInput = styled(Cleave)(({ theme }) => ({
  maxWidth: 48,
  textAlign: 'center',
  height: '48px !important',
  fontSize: '150% !important',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '&:not(:last-child)': {
    marginRight: theme.spacing(2)
  },
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    margin: 0,
    WebkitAppearance: 'none'
  }
}))

const defaultValues = {
  val1: '',
  val2: '',
  val3: '',
  val4: '',
  val5: '',
  val6: ''
}

const TwoStepsV2 = () => {
  // ** State
  const [isBackspace, setIsBackspace] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const router = useRouter()

  // ** Hooks
  const theme = useTheme()

  // console.log('email is', router.query.email)
  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/v1/lims/user/getEmail?email=${router.query.email}`)
      .then(res => {
        console.log(res)
        setPhoneNumber(res.data.phoneNumber)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  // generateOtp()
  const generateOtp = () => {
    const min = 100000 // Minimum six-digit number
    const max = 999999 // Maximum six-digit number
    const random = Math.floor(Math.random() * (max - min + 1)) + min
    //  console.log('Generated OTP:', random)
    setOtp(random)
  }

  useEffect(() => {
    if (isMounted) {
      generateOtp()
    } else {
      setIsMounted(true)
    }
  }, [isMounted])

  // useEffect(()=>{

  // },[otp])

  const handleOtp = () => {
    generateOtp()

    console.log('otp is', otp)
    const smsMessage = `Your OTP for KIU LIMS password reset is ${otp}`
    // smsService.login().then(token => {
    //     smsService.sendSMS(phoneNumber, smsMessage, token)
    //   })
  }

  const sendOTP = () => {
    generateOtp()

    console.log('otp is', otp)
    const smsMessage = `Your OTP for KIU LIMS password reset is ${otp}`
    // smsService.login().then(token => {
    //   smsService.sendSMS(phoneNumber, smsMessage, token)
    // })

    setOtpSent(true)
  }

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Vars
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  // ** Vars
  const errorsArray = Object.keys(errors)

  const [combinedValue, setCombinedValue] = useState('')

  const handleChange = (event, onChange) => {
    if (!isBackspace) {
      onChange(event)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)

      if (form[index].value && form[index].value.length && form.elements[index + 1]) {
        form.elements[index + 1].focus()
      }

      // Manually iterate through form elements to create the combined string
      let updatedCombinedValue = ''
      for (let i = 0; i < form.elements.length; i++) {
        updatedCombinedValue += form.elements[i].value
      }

      // Update the state with the combined string
      setCombinedValue(updatedCombinedValue)

      event.preventDefault()
    }
  }

  useEffect(() => {
    // Log the updated combinedValue when it changes
    console.log(combinedValue)
  }, [combinedValue])

  const handleKeyDown = event => {
    if (event.key === 'Backspace') {
      setIsBackspace(true)

      // @ts-ignore
      const form = event.target.form
      const index = [...form].indexOf(event.target)
      if (index >= 1) {
        if (!(form[index].value && form[index].value.length)) {
          form.elements[index - 1].focus()
        }
      }
    } else {
      setIsBackspace(false)
    }
  }
  // inputs fields
  const renderInputs = () => {
    return Object.keys(defaultValues).map((val, index) => (
      <Controller
        key={val}
        name={val}
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange } }) => (
          <Box
            type='tel'
            value={value}
            autoFocus={index === 0}
            component={CleaveInput}
            onKeyDown={handleKeyDown}
            onChange={event => handleChange(event, onChange)}
            options={{ blocks: [1], numeral: true, numeralPositiveOnly: true }}
            sx={{ [theme.breakpoints.down('sm')]: { px: `${theme.spacing(2)} !important` } }}
          />
        )}
      />
    ))
  }

  const handleVerifyOTP = () => {
    console.log('OTP', otp)
    console.log('combinedValue', combinedValue)

    if (otp === combinedValue) {
      console.log('Verify Success')
    } else {
      console.log('Verify Failure')
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
          <TwoStepsIllustration
            alt='two-steps-illustration'
            src={`/images/pages/auth-v2-two-steps-illustration-${theme.palette.mode}.png`}
          />
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
            <Box sx={{ my: 6 }}>
              <Typography variant='h3' sx={{ mb: 1.5 }}>
                Two-Step Verification 💬
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'text.secondary' }}>
                We sent a verification code to your mobile. Enter the code from the mobile in the field below.
              </Typography>
              <Typography variant='h6'>******{phoneNumber.substring(phoneNumber.length - 4)}</Typography>
            </Box>
            <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>Type your 6 digit security code</Typography>
            <form onSubmit={handleSubmit(() => true)}>
              <CleaveWrapper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  ...(errorsArray.length && {
                    '& .invalid:focus': {
                      borderColor: theme => `${theme.palette.error.main} !important`,
                      boxShadow: theme => `0 1px 3px 0 ${hexToRGBA(theme.palette.error.main, 0.4)}`
                    }
                  })
                }}
              >
                {renderInputs()}
              </CleaveWrapper>
              {errorsArray.length ? (
                <FormHelperText sx={{ color: 'error.main', fontSize: theme => theme.typography.body2.fontSize }}>
                  Please enter a valid OTP
                </FormHelperText>
              ) : null}
              {otpSent ? (
                <Button fullWidth type='submit' variant='contained' sx={{ mt: 2 }} onClick={handleVerifyOTP}>
                  Verify My Account
                </Button>
              ) : null}
            </form>
            {otpSent ? (
              <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.secondary' }}>Didn't get the code?</Typography>
                <Typography
                  component={LinkStyled}
                  href='/'
                  onClick={e => {
                    e.preventDefault() // Corrected syntax here
                    handleOtp()
                  }}
                  sx={{ ml: 1 }}
                >
                  Resend
                </Typography>
              </Box>
            ) : (
              <Button fullWidth type='submit' variant='contained' sx={{ mt: 2 }} onClick={() => sendOTP()}>
                Send OTP
              </Button>
            )}
          </Box>
        </Box>
      </RightWrapper>
    </Box>
  )
}
TwoStepsV2.getLayout = page => <BlankLayout>{page}</BlankLayout>
TwoStepsV2.guestGuard = true

export default TwoStepsV2
