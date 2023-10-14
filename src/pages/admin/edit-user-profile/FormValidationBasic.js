// ** React Imports
import { forwardRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { fi } from 'date-fns/locale'
import { set } from 'nprogress'

// import axios
import axios from 'axios'
import { t, use } from 'i18next'

import apiDefinitions from 'src/api/apiDefinitions'
import { api } from 'src/api/api'

const defaultValues = {
  email: '',
  lastName: '',
  password: '',
  firstName: '',
  newPassword: '', // Add a newPassword field
  confirmPassword: '' // Add a confirmPassword field
}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
  // ** Router
  const router = useRouter()

  // Access the 'id' query parameter from the URL

  // ** States
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [firstNameErrorText, setFirstNameErrorText] = useState('')
  const [lastNameErrorText, setLastNameErrorText] = useState('')
  const [emailErrorText, setEmailErrorText] = useState('')
  const [numberErrorText, setNumberErrorText] = useState('')

  useEffect(() => {
    // get user id from the URL
    const { userId } = router.query

    // get user by id
    apiDefinitions
      .getUserById(userId)
      .then(res => {
        console.log(res)
        setFirstName(res.data.fullName.split(' ')[0])
        setLastName(res.data.fullName.split(' ')[1])
        setEmail(res.data.email)
        setNumber(res.data.phoneNumber)
      })
      .catch(err => {
        console.log(err)
      })
  }, [router.query])

  // ** Hooks
  const {
    handleSubmit,
    formState: { errors },

    setValue // Set form field values
  } = useForm({ defaultValues })

  const handleClickShowPassword = () => {
    // Toggle password visibility
    setShowPassword(!showPassword)
  }

  const handleSaveChange = () => {
    // Disable editing mode when the form is submitted
    setIsEditing(false)
    console.log('clicked')

    const { userId } = router.query

    let count = 0

    // validate the form fields
    if (firstName === '') {
      setFirstNameErrorText('First name is required')
      count++
    }
    if (lastName === '') {
      setLastNameErrorText('Last name is required')
      count++
    }
    if (email === '') {
      setEmailErrorText('Email is required')
      count++
    }
    if (number === '') {
      setNumberErrorText('Phone number is required')
      count++
    }

    if (number.length !== 10 || !number.startsWith('07') || isNaN(number)) {
      setNumberErrorText('Enter valid number')
      count++
    }

    if (number !== '') {
      const regex = /^[0-9]*$/

      if (!regex.test(number)) {
        setNumberErrorText('Phone number must contain only digits')
        count++
      }
    }

    // email must be valid
    if (email !== '') {
      const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

      if (!regex.test(email)) {
        setEmailErrorText('Email is not valid')
        count++
      }
    }

    // check if password,newPassword and confirmPassword are not null

    if (password !== '' && newPassword !== '' && confirmPassword !== '') {
      const newData = {
        fullName: `${firstName} ${lastName}`,
        email: email,
        phoneNumber: number,
        password,
        newPassword,
        confirmNewPassword: confirmPassword
      }

      console.log(newData)

      // update user details in the database
      apiDefinitions
        .updateUser(userId, newData)
        .then(res => {
          console.log(res)
          toast.success('Profile updated successfully')
          router.push('/users/user-accounts')
        })
        .catch(err => {
          console.log(err)
          toast.error('Something went wrong')
        })

      return
    }

    if (password === '' && newPassword === '' && confirmPassword === '') {
      // send data payload

      if (count == 0) {
        const newData = {
          fullName: `${firstName} ${lastName}`,
          email: email,
          phoneNumber: number
        }

        // update user details in the database
        apiDefinitions
          .updateUser(userId, newData)
          .then(res => {
            console.log(res)
            toast.success('Profile updated successfully')
            router.push('/users/user-accounts')
          })
          .catch(err => {
            console.log(err)
            toast.error('Something went wrong')
          })

        return
      }
    }
    toast.error('something went wrong')
  }

  const handleEditinfo = () => {
    // Enable editing mode when the edit button is clicked
    setIsEditing(true)
  }

  const handleCancel = () => {
    const { userId } = router.query

    // Disable editing mode and reset form fields when canceled
    apiDefinitions.getUserById(userId).then(res => {
      console.log(res)
      setFirstName(res.data.fullName.split(' ')[0])
      setLastName(res.data.fullName.split(' ')[1])
      setEmail(res.data.email)
      setNumber(res.data.phoneNumber)
    })

    setPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditing(false)

    // clear error texts
    setFirstNameErrorText('')
    setLastNameErrorText('')
    setEmailErrorText('')
    setNumberErrorText('')
  }

  return (
    <Card>
      <CardHeader title='My Profile' />
      <CardContent>
        <form onSubmit={handleSubmit(handleSaveChange)}>
          <Grid container spacing={6}>
            <Grid container item xs={12} sm={12} spacing={4}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  value={firstName}
                  label='First Name'
                  helperText={firstNameErrorText}
                  error={firstNameErrorText !== ''}
                  onChange={e => {
                    setFirstName(e.target.value)
                    if (e.target.value === '') {
                      setFirstNameErrorText('First name is required')
                    }else{
                      setFirstNameErrorText('')
                    }
                  }}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  value={lastName}
                  label='Last Name'
                  helperText={lastNameErrorText}
                  error={lastNameErrorText !== ''}
                  onChange={e => {
                    setLastName(e.target.value)
                    if (e.target.value === '') {
                      setLastNameErrorText('Last name is required')
                    }else{
                      setLastNameErrorText('')
                    }
                  }}
                  InputProps={{ readOnly: !isEditing }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type='email'
                  value={email}
                  label='Email'
                  helperText={emailErrorText}
                  error={emailErrorText !== ''}
                  InputProps={{ readOnly: !isEditing }}
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
                  value={number}
                  type='tel'
                  label='Phone Number'
                  helperText={numberErrorText}
                  error={numberErrorText !== ''}
                  InputProps={{ readOnly: !isEditing }}
                  onChange={e => {
                    setNumber(e.target.value)
                    if (e.target.value.length !== 10 || !e.target.value.startsWith('07') || isNaN(e.target.value)) {
                      setNumberErrorText('Valid phone number is required')
                    } else {
                      setNumberErrorText('')
                    }

                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container item xs={12} sm={12} spacing={4}>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  label='Current-password'
                  id='validation-basic-password'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  type={showPassword ? 'text' : 'password'}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
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
                  label='New-password'
                  id='validation-basic-new-password' // Use a unique ID
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  error={Boolean(errors.newPassword)} // Use errors.newPassword
                  type={showPassword ? 'text' : 'password'}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
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
                  label='Confirm-password'
                  id='validation-basic-confirm-password' // Use a unique ID
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  error={Boolean(errors.newPassword)} // Use errors.newPassword
                  type={showPassword ? 'text' : 'password'}
                  disabled={!isEditing}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                          aria-label='toggle password visibility'
                        >
                          <Icon fontSize='1.25rem' icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Button variant='contained' type='button' onClick={handleEditinfo}>
                Edit
              </Button>
            </Grid>
            <Grid item xs={6} container justifyContent='flex-end' alignItems='center' spacing={2}>
              <Grid item>
                <Button
                  type='submit'
                  variant='contained'
                  color='success'
                  onClick={handleSaveChange}
                  disabled={!isEditing}
                >
                  Save changes
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationBasic
