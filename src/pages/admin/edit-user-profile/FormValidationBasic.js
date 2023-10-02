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
import { use } from 'i18next'

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
     const { userId } = router.query;

  
    // Fetch user details based on the 'id' parameter from the URL
    // const fetchUserDetails = async () => {
    //   const response = await fetch(`http://localhost:8080/user/get?id=${userId}`)
    //   const data = await response.json()
    //   console.log(data)
    //   setFirstName(data.fullName.split(' ')[0])
    //   setLastName(data.fullName.split(' ')[1])
    //   setEmail(data.email)
    //   setNumber(data.phoneNumber)
    // }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/v1/lims/user/${userId}`); 
        const data = response.data;
      
        console.log(data);
        setFirstName(data.fullName.split(' ')[0]);
        setLastName(data.fullName.split(' ')[1]);
        setEmail(data.email);
        setNumber(data.phoneNumber);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails()
   
  }, [])

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

  const handleSaveChange =   () => {
    // Disable editing mode when the form is submitted
    setIsEditing(false)
    console.log('clicked')

    const { userId } = router.query;



    // validate the form fields
    if (firstName === '') {
      setFirstNameErrorText('First name is required')
    }
    if (lastName === '') {
      setLastNameErrorText('Last name is required')
    }
    if (email === '') {
      setEmailErrorText('Email is required')
    }
    if (number === '') {
      setNumberErrorText('Phone number is required')
    }

    // phone number must be 10 digits
    if (number.length !== 10) {
      setNumberErrorText('Phone number must be 10 digits')
    }

    // phone number only contains digits
    if (number !== '') {
      const regex = /^[0-9]*$/

      if (!regex.test(number)) {
        setNumberErrorText('Phone number must contain only digits')
      }
    }

    // email must be valid
    if (email !== '') {
      const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

      if (!regex.test(email)) {
        setEmailErrorText('Email is not valid')
      }
    }

    // check if password,newPassword and confirmPassword are not null

    if (password !== '' || newPassword !== '' || confirmPassword !== '') {
      // check current password is correct or not
      if (password !== 'avi') {
        toast.error('Current password is incorrect')

        return
      }

      // check if newPassword and confirmPassword are same or not
      if (newPassword !== confirmPassword) {
        toast.error('New password and confirm password are not same')

        return
      }

      // 3 fields must be filled
      if (password !== '' && newPassword !== '' && confirmPassword !== '') {
        // send data payload
        const newData = {
          fullName: `${firstName} ${lastName}`,
          email: email,
          phoneNumber: number,
          password: newPassword
        }


        toast.success('Password changed successfully')
        console.log(newData)

        // clear password,newPassword and confirmPassword fields
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')

        return
      }

      toast.error('New password and confirm password are required')

      return
    }

    // send data payload
    const newData = {
      fullName: `${firstName} ${lastName}`,
      email: email,
      phoneNumber: number

    }

    // update user details in the database
    axios.put(`http://localhost:8082/api/v1/lims/user/update/${userId}`, newData)
    .then(response => {
      console.log(response)
      toast.success('Profile updated successfully')
    
    })
    .catch(error => {
      console.log(error)
    })
   
    


  }

  const handleEditinfo = () => {
    // Enable editing mode when the edit button is clicked
    setIsEditing(true)
  }

  const handleCancel =  () => {
    const { userId } = router.query;

    // Disable editing mode and reset form fields when canceled
    

    const fetchUserDetails = async () => {
      const response = await axios.get(`http://localhost:8082/api/v1/lims/user/${userId}`)
      const data = response.data
      console.log(data)
      setFirstName(data.fullName.split(' ')[0])
      setLastName(data.fullName.split(' ')[1])
      setEmail(data.email)
      setNumber(data.phoneNumber)
    }

    fetchUserDetails()

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
                  onChange={e => setFirstName(e.target.value)}
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
                  onChange={e => setLastName(e.target.value)}
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
                  onChange={e => setEmail(e.target.value)}
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
                  onChange={e => setNumber(e.target.value)}
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
