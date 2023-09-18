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
  checkbox: false
}

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const FormValidationBasic = () => {
  // ** States
  const [state, setState] = useState({
    password: '',
    showPassword: false
  })

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword })
  }
  const onSubmit = () => toast.success('Form Submitted')

  return (
    <Card>
      <CardHeader title='Personal Info' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Controller
                name='firstName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='First Name'
                    onChange={onChange}
                    placeholder='Leonard'
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Last Name'
                    onChange={onChange}
                    placeholder='Carter'
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
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    type='email'
                    value={value}
                    label='Email'
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='carterleonard@gmail.com'
                    aria-describedby='validation-basic-email'
                    {...(errors.email && { helperText: 'This field is required' })}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                name='current-password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Current-password'
                    onChange={onChange}
                    id='validation-basic-password'
                    error={Boolean(errors.password)}
                    type={state.showPassword ? 'text' : 'password'}
                    {...(errors.password && { helperText: 'This field is required' })}
                    InputProps={{
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
                name='new-password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='New-password'
                    onChange={onChange}
                    id='validation-basic-password'
                    error={Boolean(errors.password)}
                    type={state.showPassword ? 'text' : 'password'}
                    {...(errors.password && { helperText: 'This field is required' })}
                    InputProps={{
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
                name='comfirm-password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <CustomTextField
                    fullWidth
                    value={value}
                    label='Comfirm-password'
                    onChange={onChange}
                    id='validation-basic-password'
                    error={Boolean(errors.password)}
                    type={state.showPassword ? 'text' : 'password'}
                    {...(errors.password && { helperText: 'This field is required' })}
                    InputProps={{
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

            <Grid item xs={6}>
              <Button type='submit' variant='contained'>
                Edit
              </Button>
            </Grid>
            <Grid item xs={6} container justifyContent='flex-end' alignItems='center' spacing={2}>
              <Grid item>
                <Button type='submit' variant='contained'>
                  Save changes
                </Button>
              </Grid>
              <Grid item>
                <Button type='submit' variant='contained' color='secondary'>
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
