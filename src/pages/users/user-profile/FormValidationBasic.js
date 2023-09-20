// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import FormLabel from '@mui/material/FormLabel'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const defaultValues = {
  dob: null,
  email: '',
  radio: '',
  select: '',
  lastName: '',
  password: '',
  textarea: '',
  firstName: '',
  checkbox: false,
  newPassword: '', // Add a newPassword field
  confirmPassword: '' // Add a confirmPassword field
}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
  // ** States
  const [state, setState] = useState({
    password: '',
    showPassword: false,
    isEditing: false
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues, // Get the form values
    setValue // Set form field values
  } = useForm({ defaultValues })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }

  const handleSaveChange = () => {
    // Disable editing mode when the form is submitted
    setState({ ...state, isEditing: false })

    // Check if newPassword and confirmPassword match
    const newPassword = getValues('newPassword')
    const confirmPassword = getValues('confirmPassword')

    if (newPassword !== confirmPassword) {
      toast.error('New Password and Confirm Password must match')

      return
    }

    toast.success('Form Submitted')

    setValue('newPassword', '')
    setValue('confirmPassword', '')
  }

  const handleEditinfo = () => {
    setState({ ...state, isEditing: true })
  }

  const handleCancel = () => {
    // Disable editing mode and reset form fields when canceled
    setValue('newPassword', '')
    setValue('confirmPassword', '')
    setState({ ...state, isEditing: false })
  }

  return (
    <Card>
      <CardHeader title='My Profile' />
      <CardContent>
        <form onSubmit={handleSubmit(handleSaveChange)}>
          <Grid container spacing={6}>
            <Grid container item xs={12} sm={12} spacing={4}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='firstName'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='First Name'
                      onChange={onChange}
                      placeholder='Avishka'
                      InputProps={{ readOnly: !state.isEditing }}
                      error={Boolean(errors.firstName)}
                      aria-describedby='validation-basic-first-name'
                      {...(errors.firstName && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='lastName'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Last Name'
                      onChange={onChange}
                      InputProps={{ readOnly: !state.isEditing }}
                      placeholder='Nuwan'
                      error={Boolean(errors.lastName)}
                      aria-describedby='validation-basic-last-name'
                      {...(errors.lastName && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      type='email'
                      value={value}
                      label='Email'
                      InputProps={{ readOnly: !state.isEditing }}
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='avishka@gmail.com'
                      aria-describedby='validation-basic-email'
                      {...(errors.email && { helperText: 'This field is required' })}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container item xs={12} sm={12} spacing={4}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name='current-password'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Current-password'
                      onChange={onChange}
                      id='validation-basic-password'
                      error={Boolean(errors.password)}
                      placeholder='********'
                      type={state.showPassword ? 'text' : 'password'}
                      {...(errors.password && { helperText: 'This field is required' })}
                      InputProps={{
                        readOnly: !state.isEditing,
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='newPassword' // Use unique names for each field
                  control={control}
                  rules={{
                    validate: value => {
                      return value === getValues('confirmPassword')
                    }
                  }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='New-password'
                      onChange={onChange}
                      id='validation-basic-new-password' // Use a unique ID
                      error={Boolean(errors.newPassword)} // Use errors.newPassword
                      type={state.showPassword ? 'text' : 'password'}
                      {...(errors.newPassword && { helperText: 'New Password and Confirm Password must match' })}
                      InputProps={{
                        readOnly: !state.isEditing,
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name='confirmPassword' // Use unique names for each field
                  control={control}
                  rules={{
                    required: true,
                    validate: value => {
                      return value === getValues('newPassword')
                    }
                  }}
                  render={({ field: { value, onChange } }) => (
                    <CustomTextField
                      fullWidth
                      value={value}
                      label='Confirm-password'
                      onChange={onChange}
                      id='validation-basic-confirm-password' // Use a unique ID
                      error={Boolean(errors.confirmPassword)} // Use errors.confirmPassword
                      type={state.showPassword ? 'text' : 'password'}
                      {...(errors.confirmPassword && { helperText: 'New Password and Confirm Password must match' })}
                      InputProps={{
                        readOnly: !state.isEditing,
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={handleClickShowPassword}
                              onMouseDown={e => e.preventDefault()}
                              aria-label='toggle password visibility'
                            >
                              <Icon fontSize='1.25rem' icon={state.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
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
                  disabled={!state.isEditing}
                >
                  Save changes
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={handleCancel} disabled={!state.isEditing}>
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
