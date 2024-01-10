// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icon Imports
import { useRouter } from 'next/router'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label='Date' autoComplete='off' />
})

const FormLayoutsSeparator = () => {
  // ** States
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())

  const router = useRouter()

  const handleUploadRedirect = () => {
    router.push('/staff/internal-quality-assurance/temperature-monitoring-chart/RechartsAreaChart')
  }

  return (
    <Card>
      <CardHeader title='Temperature Monitoring Form' />
      <Divider sx={{ m: '0 !important' }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Refrigerator 1' placeholder='Refrigerator 1' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField fullWidth label='Refrigerator 2' placeholder='Refrigerator 2' />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePickerWrapper>
                <DatePicker
                  selected={date}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText='MM-DD-YYYY'
                  customInput={<CustomInput />}
                  id='form-layouts-separator-date'
                  onChange={date => setDate(date)}
                />
              </DatePickerWrapper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                showTimeSelect
                selected={time}
                timeIntervals={15}
                showTimeSelectOnly
                dateFormat='h:mm aa'
                id='time-only-picker'
                onChange={date => setTime(date)}
                customInput={<CustomInput label='Time Only' />}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: '0 !important' }} />
        <CardActions>
          <Button type='submit' sx={{ mr: 2 }} variant='contained' onClick={handleUploadRedirect}>
            Submit
          </Button>
          <Button type='reset' color='secondary' variant='tonal'>
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsSeparator
