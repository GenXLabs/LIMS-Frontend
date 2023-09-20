// ** React Imports
import { forwardRef, useState, useEffect } from 'react'

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
  const userDetails = JSON.parse(localStorage.getItem('userData'))

  // ** States
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)


  useEffect(() => {
    const name = userDetails.fullName.split(' ')

    setFirstName(name[0])
    setLastName(name[1])
    setEmail(userDetails.email)
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

  const handleSaveChange = () => {
    // Disable editing mode when the form is submitted
    setIsEditing(false)

    // if current password is not correct
    if (password !== 'admin') {
      toast.error('Current password is incorrect')

      return 
    }

    // if new password and confirm password are not the same
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirm password are not the same')

      return
    }


    toast.success('Form Submitted')

    setValue('newPassword', '')
    setValue('confirmPassword', '')
  }

  const handleEditinfo = () => {
    // Enable editing mode when the edit button is clicked
    setIsEditing(true)
  }

  const handleCancel = () => {
    // Disable editing mode and reset form fields when canceled
   setFirstName(userDetails.fullName.split(' ')[0])
    setLastName(userDetails.fullName.split(' ')[1])
    setEmail(userDetails.email)
    setPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditing(false)

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
                  onChange={e => setFirstName(e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  error={Boolean(errors.firstName)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  value={lastName}
                  label='Last Name'
                  onChange={e => setLastName(e.target.value)}
                  InputProps={{ readOnly: !isEditing }}
                  error={Boolean(errors.lastName)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <CustomTextField
                  fullWidth
                  type='email'
                  value={email}
                  label='Email'
                  InputProps={{ readOnly: !isEditing }}
                  onChange={e => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
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
                <Button variant='contained' color='secondary' onClick={handleCancel} disabled={!isEditing}>
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
